'use client';
import React, { useReducer, ReactNode, useEffect } from 'react';
import { UserContext, reducer, initialState, User } from '@/app/context/reducer';

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load state from localStorage on first client render
  useEffect(() => {
    try {
      const stored = localStorage.getItem('user');
      if (stored) {
        const parsedUser: Omit<User, 'isLoggedIn'> = JSON.parse(stored);
        dispatch({ type: 'LOGIN', payload: parsedUser });
      }
    } catch (error) {
      console.error('Failed to load user from localStorage:', error);
    }
  }, []);

  // Save state to localStorage on changes
  useEffect(() => {
    if (state.isLoggedIn) {
      const { isLoggedIn, ...toStore } = state;
      localStorage.setItem('user', JSON.stringify(toStore));
    } else {
      localStorage.removeItem('user');
    }
  }, [state]);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
