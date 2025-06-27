import { signIn } from 'next-auth/react';

type Props = {
  provider: string;
  options?: {
    callbackUrl?: string;
    email?: string;
    password?: string;
  };
};

export const login = async ({ provider, options }: Props) => {
  try {
    if (provider === 'credentials' && (!options?.email || !options.password)) {
      throw new Error('Please enter both email and password.');
    }

    const res = await signIn(provider, options);

    if (!res) throw new Error('Server error. Please try again later.');

    if (res.ok) {
      return { message: 'Login successful.' };
    } else {
      throw new Error('Invalid credentials or login failed.');
    }
  } catch (error) {
    console.error('Register error:', (error as Error).message);
    throw new Error((error as Error).message || 'An unexpected error occurred.');
  }
};
