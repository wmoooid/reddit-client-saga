import Cors from 'cors';
import fetch from 'node-fetch';
import initMiddleware from '@/lib/init-middleware';
import { setCookies } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';
import { redis } from '@/lib/redis';

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS'],
  }),
);

interface ResponseDataType {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res);

  if (req.query.code) {
    const form = new URLSearchParams({
      grant_type: 'authorization_code',
      code: `${req.query.code}`,
      redirect_uri: `${process.env.REDIRECT_URL}`,
    });

    const credentials = Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64');

    try {
      const response = await fetch('https://www.reddit.com/api/v1/access_token', {
        method: 'POST',
        headers: { Authorization: `Basic ${credentials}` },
        body: form,
      });
      const data = (await response.json()) as ResponseDataType;
      setCookies(`token`, `${data['access_token']}`, { req, res, expires: new Date(Date.now() + 86400e3) });
      redis.set('REFRESH_TOKEN', data['refresh_token']);
      res.redirect(`/`);
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log('BAD REQUEST');
    return res.status(400).send(400);
  }
}
