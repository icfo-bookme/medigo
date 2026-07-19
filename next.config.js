/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Combine everything into ONE images object
    unoptimized: true, 
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.medigo.com.bd",
      },
      {
        protocol: "http",
        hostname: "medigo.com.bd",
      },
    ],
  },
};

module.exports = nextConfig;