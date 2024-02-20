'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

export default function DashboardPage() {
  const { data, status, update } = useSession();
  // const { accessToken } = data;

  /**
   * status== "authenticated" | "loading" | "unauthenticated"
   * update== ()=>{}
   */
  return <section>Dashboard Page</section>;
}
