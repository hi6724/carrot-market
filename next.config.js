/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["imagedelivery.net", "mblogthumb-phinf.pstatic.net"],
  },
};

module.exports = nextConfig;
