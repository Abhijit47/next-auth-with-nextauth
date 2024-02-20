import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@/lib/mongoClient';

const options = {
  // adapter: MongoDBAdapter(clientPromise),
  providers: [
    // OAuth authentication providers...
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // type: 'credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.

      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@gmail.com',
          // defaultValue: 'abhijit123@gmail.com',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: '*****',
          // defaultValue: 'admin123',
        },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        // console.log('req', req);
        // console.log('req', req.body);
        // console.log('cred', credentials);

        const res = await fetch(
          'https://next-auth-with-nextauth.vercel.app/api/user',
          {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { 'Content-Type': 'application/json' },
          }
        );
        const user = await res.json();
        // console.log('user', user);

        // If no error and we have user data, return it
        if (res.ok && user) {
          // console.log(res.status, res.statusText);
          // i need to to store this session

          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  theme: {
    colorScheme: 'light', // "auto" | "dark" | "light"
    brandColor: '#6366F1', // Hex color code
    logo: 'https://next-auth.js.org/img/logo/logo-xs.png', // Absolute URL to image
    buttonText: 'Sign in to get access', // Hex color code
  },
  // session: {
  //   // Choose how you want to save the user session.
  //   // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
  //   // If you use an `adapter` however, we default it to `"database"` instead.
  //   // You can still force a JWT session by explicitly defining `"jwt"`.
  //   // When using `"database"`, the session cookie will only contain a `sessionToken` value,
  //   // which is used to look up the session in the database.
  //   strategy: 'database',

  //   // Seconds - How long until an idle session expires and is no longer valid.
  //   maxAge: 30 * 24 * 60 * 60, // 30 days

  //   // Seconds - Throttle how frequently to write to database to extend a session.
  //   // Use it to limit write operations. Set to 0 to always update the database.
  //   // Note: This option is ignored if using JSON Web Tokens
  //   updateAge: 24 * 60 * 60, // 24 hours

  //   // The session token is usually either a random UUID or string, however if you
  //   // need a more customized session token string, you can define your own generate function.
  //   generateSessionToken: () => {
  //     return randomUUID?.() ?? randomBytes(32).toString('hex');
  //   },
  // },
  // jwt: {
  //   // The maximum age of the NextAuth.js issued JWT in seconds.
  //   // Defaults to `session.maxAge`.
  //   maxAge: 60 * 60 * 24 * 30,
  //   // You can define your own encode/decode functions for signing and encryption
  //   async encode() {},
  //   async decode() {},
  // },
};

export default options;
