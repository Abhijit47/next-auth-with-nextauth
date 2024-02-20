/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'next-auth.js.org',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

// (https://lh3.googleusercontent.com/a/ACg8ocIC2mB0XmFQJci1ZWMJprGInWCOeSDK9pvIQ9FLRyUIyYI=s96-c)

//  (https://avatars.githubusercontent.com/u/59195447?v=4)

// https://placehold.co/50x50

// https://next-auth.js.org/img/logo/logo-xs.png
export default nextConfig;
