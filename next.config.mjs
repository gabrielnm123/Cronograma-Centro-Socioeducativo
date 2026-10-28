/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { serverActions: { bodySizeLimit: '10mb' } },
  allowedDevOrigins: ['localhost:3000', '127.0.0.1:3000', '172.29.121.153:3000'],
};
export default nextConfig;
