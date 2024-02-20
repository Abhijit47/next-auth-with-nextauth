'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const { data: session } = useSession();
  // console.log('session', session?.user);
  // console.dir(session?.user);

  /**
   * {
    "user": {
        "name": "Abhijit",
        "email": "akarmakar846@gmail.com",
        "image": "https://avatars.githubusercontent.com/u/59195447?v=4"
    },
    "expires": "2024-03-21T05:05:01.259Z"
}
   */

  return (
    <header className='bg-indigo-500 p-4 sticky top-0'>
      <nav className='flex items-center justify-between'>
        <Link href={'/'}>
          <div className='text-2xl font-semibold'>NextAuth</div>
        </Link>

        <ul className='flex items-center gap-x-4'>
          <li>
            <Link href={'/'}>Home</Link>
          </li>
          <li>
            <Link href={'/about'}>About</Link>
          </li>
          <li>
            <Link href={'/dashboard'}>Dashboard</Link>
          </li>
          <li>
            <Link href={'/contact'}>Contact</Link>
          </li>
          <li className='flex items-center gap-x-4'>
            {session ? (
              <>
                <Image
                  // src={session?.user?.image}
                  src={session?.user?.image ?? 'https://placehold.co/50x50'}
                  alt='avatar'
                  width={50}
                  height={50}
                  className='rounded-full size-10 object-cover'
                  priority
                />
                <button
                  className='bg-red-500 px-4 py-1.5 rounded-md text-white'
                  onClick={() => signOut({ callbackUrl: '/', redirect: true })}>
                  Logout
                </button>
              </>
            ) : (
              <button
                className='bg-teal-500 px-4 py-2 rounded-md text-white'
                onClick={() => signIn()}
                // onClick={() => signIn('credentials', { callbackUrl: '/sign-in' })}
              >
                Login
              </button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
