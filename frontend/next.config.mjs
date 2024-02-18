/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_ENDPOINT}/api/:path*`,
      },
    ];
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
};

export default nextConfig;
