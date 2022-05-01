import { fetcher } from '@/lib/fetcher';
import { getCookie } from 'cookies-next';
import useSWR from 'swr';

export default function useIndex() {
  const token = getCookie(`token`);
  const { data, error } = useSWR(
    [
      `https://www.reddit.com/hot.json?raw_json=1`,
      {
        method: 'get',
      },
    ],
    fetcher,
  );
  const posts = data?.data?.children || [];
  return {
    posts: posts,
    isLoading: !error && !data,
    isError: error,
  };
}
