import { login } from '@/features/auth/lib/login';
import { useSession } from 'next-auth/react';
import { signup } from './signup';

export const useAuth = () => {
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const user = session?.user;

  return { isAuthenticated, user, status, login, signup };
};
