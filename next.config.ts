/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eda.ru",
      },
      {
        protocol: "https",
        hostname: "s1.eda.ru",
      },
    ],
  },
};

module.exports = nextConfig;
