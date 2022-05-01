import { fetcher } from '@/lib/fetcher';
import { getCookie } from 'cookies-next';
import useSWR from 'swr';

export default function usePost(pid: string | string[] | undefined) {
  const token = getCookie(`token`);
  const { data, error, mutate } = useSWR(
    [
      `https://oauth.reddit.com/comments/${pid}?raw_json=1`,
      {
        method: 'get',
        headers: { Authorization: `bearer ${token}` },
      },
    ],
    fetcher,
    { shouldRetryOnError: false },
  );

  const [postResponse, commentsResponse] = data || [];
  const [post] = postResponse?.data?.children || [];
  const comments = commentsResponse?.data?.children || [];

  return {
    post: post,
    comments: comments,
    isLoading: !error && !data,
    isError: error,
    mutate: mutate,
  };
}
