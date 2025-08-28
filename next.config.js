module.exports = {
  reactStrictMode: false,
  // onDemandEntries: {
  //   maxInactiveAge: 25 * 1000,
  //   pagesBufferLength: 2,
  // },
  // experimental: {
 
  //   largePageDataBytes: 128 * 100000,
  // },
  images: {
    minimumCacheTTL: 120,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};
