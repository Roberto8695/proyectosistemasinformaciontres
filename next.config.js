/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  output: "export",
  basePath: "",
  assetPrefix: "./",
  trailingSlash: true,
}

module.exports = nextConfig 