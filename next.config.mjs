/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Allow',
            value: 'GET, POST, HEAD, OPTIONS',
          },
        ],
      },
    ];
  },
};

export default nextConfig;