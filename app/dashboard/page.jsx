// 'use client';

import { getServerSession } from 'next-auth';
import options from '../api/auth/[...nextauth]/options';
import Image from 'next/image';

// import { useSession, signIn, signOut } from 'next-auth/react';

export default async function DashboardPage() {
  // const { data, status, update } = useSession();
  const { user } = await getServerSession(options);
  // console.log(user );

  /**
   * 
   * {
  user: {
    name: 'Abhijit',
    email: 'akarmakar846@gmail.com',
    image: 'https://avatars.githubusercontent.com/u/59195447?v=4'
  }
}
   */

  /**
   * status== "authenticated" | "loading" | "unauthenticated"
   * update== ()=>{}
   */
  return (
    <section>
      <div className='max-w-lg m-auto mt-16 bg-slate-400 grid gap-y-6 justify-items-center p-16 rounded-xl'>
        <Image
          src={user?.image}
          width={80}
          height={80}
          alt='user-avatar'
          priority
          className='rounded-full object-cover'
        />
        <h3 className='text-lg font-medium'>{user?.name}</h3>
      </div>
    </section>
  );
}
