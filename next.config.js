/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [`image.tmdb.org`, `themoviedb.org`, `localhost:3000`],
  },
}

module.exports = nextConfig
