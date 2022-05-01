import { BASE_URL, fetcher, GET_PARAMS, SWR_OPTIONS, URL_PARAMS } from '@/lib/fetcher';
import { ListingsResponseChildrenType } from '@/types/listings';
import { getCookie } from 'cookies-next';
import useSWR from 'swr';

export default function useListing(listingName: string) {
  const token = getCookie(`token`);

  const { data, error } = useSWR([`${BASE_URL}${listingName}?${URL_PARAMS}`, GET_PARAMS], fetcher, SWR_OPTIONS);

  const posts: ListingsResponseChildrenType[] = data?.data?.children || [];

  return {
    posts: posts,
    isLoading: !error && !data,
    isError: error,
  };
}
