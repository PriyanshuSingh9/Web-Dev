/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  // You can store static files, like images and fonts, under a folder called public in the root directory.
  // Files inside public can then be referenced by your code starting from the base URL(/).
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;
