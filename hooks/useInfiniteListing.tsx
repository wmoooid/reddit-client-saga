import { BASE_URL, fetcher, URL_PARAMS } from '@/lib/fetcher';
import { ListingsResponseChildrenType } from '@/types/listings';
import { getCookie, setCookies } from 'cookies-next';
import { SWRConfiguration } from 'swr';
import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite';

export default function useInfiniteListing(listing: string) {
  const TOKEN = getCookie(`token`);

  const GET_PARAMS = {
    method: 'get',
    headers: { Authorization: `bearer ${TOKEN}` },
  };

  const SWR_OPTIONS: SWRConfiguration = {
    onErrorRetry: async (error, key, config, revalidate, { retryCount }) => {
      if (error.status === 400) return;
      if (error.status === 401) {
        const res = await fetch('/api/reauth?get=token');
        if (res.status === 200) {
          const data = await res.json();
          setCookies(`token`, `${data['access_token']}`, { expires: new Date(Date.now() + 86400e3) });
        }
      }
      if (error.status === 404) return;
      if (retryCount >= 5) return;
      setTimeout(() => revalidate({ retryCount }), 1000);
    },
  };

  const getKey: SWRInfiniteKeyLoader = (pageIndex, previousPageData) => {
    if (pageIndex === 0) return [`${BASE_URL}${listing}?${URL_PARAMS}`, GET_PARAMS];

    return [`${BASE_URL}${listing}?${URL_PARAMS}&after=${previousPageData.data.after}`, GET_PARAMS];
  };

  const { data, error, isValidating, mutate, size, setSize } = useSWRInfinite(getKey, fetcher, SWR_OPTIONS);

  const posts: ListingsResponseChildrenType[] = [];

  data?.forEach((chunk) => {
    posts.push(...chunk.data.children);
  });

  return {
    posts: posts,
    isLoading: !error && !data,
    isValidating: isValidating,
    isError: error,
    size: size,
    setSize: setSize,
    mutate: mutate,
  };
}
