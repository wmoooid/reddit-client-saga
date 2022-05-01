import { fetcher } from '@/lib/fetcher';
import { SearchResponse } from '@/types/search';
import { getCookie } from 'cookies-next';
import useSWR from 'swr';

export default function useSearch(query: string) {
  const token = getCookie(`token`);
  const { data, error } = useSWR(
    [
      `https://oauth.reddit.com/api/search_subreddits?raw_json=1&query=${query}`,
      {
        method: 'POST',
        headers: { Authorization: `bearer ${token}` },
      },
    ],
    fetcher,
    { shouldRetryOnError: false, revalidateOnFocus: false },
  );

  const list: SearchResponse = data?.subreddits || [];

  return {
    list: list,
    isLoading: !error && !data,
    isError: error,
  };
}
