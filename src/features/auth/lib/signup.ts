import { z } from 'zod';
import { RegisterSchema } from '../model/form';
import { login } from './login';

type Props = z.infer<typeof RegisterSchema>;

export const signup = async (data: Props) => {
  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const resData = await res.json();

    if (!res.ok) throw new Error(resData?.message || 'Registration failed.');

    await login({
      provider: 'credentials',
      options: {
        email: data.email,
        password: data.password,
      },
    });

    return { message: 'Registration and login successful.' };
  } catch (error) {
    console.error('Register error:', (error as Error).message);
    throw new Error((error as Error).message || 'An unexpected error occurred.');
  }
};
