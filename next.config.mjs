/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "*",
      },
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
