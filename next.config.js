/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.opusvirtualoffices.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'njs.opusvirtualoffices.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
