'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../context/reducer';

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const {state} = useUser()
  const token =state.token 

  useEffect(() => {
    if (!token) {
      router.replace('/login'); // client-side redirect
    }
  }, [token, router]);

  if (!token) {
    return null; // or loading spinner
  }

  return <>{children}</>;
}
