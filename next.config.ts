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
      {
        protocol: "https",
        hostname: "nftstorage.link",
        port: "",
        pathname: "/ipfs/**",
      },
      {
        protocol: "https",
        hostname: "media.cdn.magiceden.dev",
        port: "",
        pathname: "/**",
      },
      // Added Magic Eden renderer domain
      {
        protocol: "https",
        hostname: "renderer.magiceden.dev",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
