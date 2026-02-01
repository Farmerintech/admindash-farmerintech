'use client';
import React, { createContext, useContext } from 'react';

export interface User {
  email:string,
  firstName: string;
  lastName: string;
  token: any;
  role: string;
  isLoggedIn: boolean;
  profileImage:string
}

export type Action =
  | { type: 'LOGIN'; payload: Omit<User, 'isLoggedIn'> }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: Partial<Omit<User, 'isLoggedIn'>> };

export const initialState: User = {
  email:"",
  firstName: '',
  lastName: '',
  token: null,
  role: '',
  isLoggedIn: false,
  profileImage:"",
};
 
export const UserContext = createContext<{
  state: User;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

export function reducer(state: User, action: Action): User {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, ...action.payload, isLoggedIn: true };
    case 'LOGOUT':
      return initialState;
    case 'UPDATE_USER':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export const useUser = () => useContext (UserContext);