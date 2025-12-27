/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ESLint während Build ignorieren
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async rewrites() {
    return [
      // Redirect /defaultsite zur Root-URL
      {
        source: '/defaultsite',
        destination: '/',
      },
      {
        source: '/defaultsite/:path*',
        destination: '/:path*',
      },
    ];
  },
}

module.exports = nextConfig