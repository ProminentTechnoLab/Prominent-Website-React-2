/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',          // generates static HTML in out/
    trailingSlash: true,       // /about/ → out/about/index.html
    images: {
        unoptimized: true,       // required for static export
    },
}

module.exports = nextConfig
