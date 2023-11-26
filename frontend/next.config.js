/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'export',
  images: {unoptimized: true},
  env: {
    infuraKey: process.env.INFURA_KEY,
    alchemyKey: process.env.ALCHEMY_KEY,
    walletConnectProjectId: process.env.WALLET_CONNECT_PROJECT_ID,
    apiUrl: process.env.API_URL
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
