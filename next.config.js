/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.dribbble.com', 'www.redditstatic.com', 'b.thumbs.redditmedia.com', 'a.thumbs.redditmedia.com'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/hot',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
