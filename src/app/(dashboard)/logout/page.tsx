'use client';

import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import React from 'react';
import { useUser } from '@/app/context/reducer';

const LogoutButton = () => {
  const { dispatch } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    // Remove token from cookies if applicable
    Cookies.remove('token');

    // Clear user context
    dispatch({ type: 'LOGOUT' });

    // Redirect to login page
    router.push('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
