'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../context/reducer';
import { jwtDecode } from 'jwt-decode';

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const { state } = useUser();

  useEffect(() => {
    const checkAuth = () => {
      if (!state.token) {
        setIsChecking(false); // Finish checking so component renders (and redirects)
        router.replace('/login');
        return;
      }

      try {
        const decoded: any = jwtDecode(state.token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
          console.log('Token expired');
          router.replace('/login');
        } else {
          setIsChecking(false); // Auth is valid, render children
        }
      } catch (error) {
        console.error('Invalid token:', error);
        router.replace('/login');
      }
    };

    // Delay slightly to allow context to hydrate from localStorage
    const timeout = setTimeout(checkAuth, 50);

    return () => clearTimeout(timeout);
  }, [state.token, router]);

  if (isChecking) return null; // or a loading spinner

  return <>{children}</>;
}
