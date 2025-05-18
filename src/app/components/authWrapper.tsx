'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../context/reducer';
import {jwtDecode} from 'jwt-decode';

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const { state } = useUser();

  useEffect(() => {
    if (!state.token) {
      router.replace('/login');
      return;
    }

    try {
      const decoded: any = jwtDecode(state.token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        router.replace('/login');
      } else {
        setIsChecking(false);
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      router.replace('/login');
    }
  }, [state.token, router]);

  if (isChecking) return null; // Or show a spinner here

  return <>{children}</>;
}
