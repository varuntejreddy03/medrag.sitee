/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NODE_ENV === 'production' 
      ? 'https://YOUR_SERVEO_URL.serveo.net' 
      : 'http://localhost:8000',
  },
  experimental: {
    optimizeCss: true,
  },
}

module.exports = nextConfig