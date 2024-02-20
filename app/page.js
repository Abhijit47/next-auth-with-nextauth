import Image from 'next/image';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-y-8 p-24'>
      <div>
        <Image
          src={'https://next-auth.js.org/img/logo/logo-xs.png'}
          width={65}
          height={72}
          alt='logo'
          priority
        />
      </div>
      <h1 className='text-2xl text-center'>
        <span className='block text-4xl font-bold'>
          Authentication and authorization
        </span>
        with
        <span className='block text-5xl font-extrabold bg-gradient-to-tr text-transparent bg-clip-text from-cyan-500 to-purple-500'>
          NextAuth
        </span>
      </h1>
    </main>
  );
}
