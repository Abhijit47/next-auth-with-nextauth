// The most simple usage is when you want to require authentication for your entire site.

export { default } from 'next-auth/middleware';

// If you only want to secure certain pages, export a config object with a matcher
export const config = { matcher: ['/dashboard'] };
