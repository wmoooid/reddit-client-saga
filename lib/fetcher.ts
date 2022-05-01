import { getCookie, setCookies } from 'cookies-next';
import { SWRConfiguration } from 'swr';

type FetcherArgs = [string, object];

type ErrorInfo = {
  info: Response;
  status: number;
};

export const fetcher = async (...args: FetcherArgs) => {
  const res = await fetch(...args);

  if (!res.ok) {
    const error = {} as ErrorInfo;
    error.info = res;
    error.status = res.status;
    throw error;
  }

  return res.json();
};

export let TOKEN = getCookie(`token`);

export const BASE_URL = 'https://oauth.reddit.com';

export const URL_PARAMS = new URLSearchParams({
  raw_json: '1',
  limit: '10',
});

export const GET_PARAMS = {
  method: 'get',
  headers: { Authorization: `bearer ${TOKEN}` },
};

export const SWR_OPTIONS: SWRConfiguration = {
  onErrorRetry: async (error, key, config, revalidate, { retryCount }) => {
    if (error.status === 400) return;
    if (error.status === 401) {
      const res = await fetch('/api/reauth?get=token');
      if (res.status === 200) {
        const data = await res.json();
        setCookies(`token`, `${data['access_token']}`, { expires: new Date(Date.now() + 86400e3) });
        return;
      }
    }
    if (error.status === 404) return;
    if (retryCount >= 5) return;
    setTimeout(() => revalidate({ retryCount }), 1000);
  },
};
