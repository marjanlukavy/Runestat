/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ord-mirror.magiceden.dev",
        port: "",
        pathname: "/content/**",
      },
      {
        protocol: "https",
        hostname: "**.ipfs.w3s.link",
        port: "",
        pathname: "/**",
      },
      // More generalized pattern for IPFS gateways
      {
        protocol: "https",
        hostname: "*.ipfs.*",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
