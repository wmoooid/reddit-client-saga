import { fetcher } from '@/lib/fetcher';
import { SubscriptionsResponseChildren } from '@/types/subscriptions';
import { getCookie } from 'cookies-next';
import useSWR from 'swr';

export default function useSubscriptions() {
  const token = getCookie(`token`);
  const { data, error } = useSWR(
    [
      'https://oauth.reddit.com/subreddits/mine/subscriber?raw_json=1',
      {
        method: 'get',
        headers: { Authorization: `bearer ${token}` },
      },
    ],
    fetcher,
    { shouldRetryOnError: false, revalidateOnFocus: false },
  );

  const subscriptions: SubscriptionsResponseChildren[] = data?.data?.children || [];

  return {
    subscriptions: subscriptions,
    isLoading: !error && !data,
    isError: error,
  };
}
