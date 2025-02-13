/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
  },
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

export default nextConfig;
