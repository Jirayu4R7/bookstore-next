/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["storage.naiin.com", "down-th.img.susercontent.com"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
