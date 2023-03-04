// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
    removeConsole: process.env.NODE_ENV === "production",
  },
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  experimental: {
    externalDir: true,
    appDir: true,
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
  output: "standalone",
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: { dimensions: false },
        },
      ],
    });

    return config;
  },
  images: {
    remotePatterns: [{ hostname: "*", protocol: "https" }],
  },
  async redirects() {
    return [];
  },
};

module.exports = nextConfig;
