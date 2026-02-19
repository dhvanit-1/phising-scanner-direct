/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self';",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com;",
              "worker-src 'self' blob:;",
              "connect-src 'self' https://tiles.openfreemap.org https://placehold.co https://va.vercel-scripts.com https://nominatim.openstreetmap.org;",
              "img-src 'self' blob: data: https://tiles.openfreemap.org https://placehold.co;",
              "style-src 'self' 'unsafe-inline' https://tiles.openfreemap.org;",
              "font-src 'self' data:;",
            ].join(' '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;