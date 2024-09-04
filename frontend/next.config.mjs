/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  webpack: (config, context) => {
    config.watchOptions = {
      ignored: /node_modules/,
      poll: 8000,
      aggregateTimeout: 300,
    }
    return config;
  },
  output: "standalone",
};

export default nextConfig;
