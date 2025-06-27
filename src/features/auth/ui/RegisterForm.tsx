'use client';

import { Button } from '@/shared/ui/shadcn/button';
import { Input } from '@/shared/ui/shadcn/input';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaArrowLeft } from 'react-icons/fa';
import { PiEye, PiEyeClosed } from 'react-icons/pi';
import { toast } from 'sonner';
import { z } from 'zod';
import { signup } from '../lib/signup';
import { RegisterSchema } from '../model/form';
import ProviderLogin from './ProviderLogin';

type Inputs = z.infer<typeof RegisterSchema>;

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const processForm: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await signup(data);

      if (res && res.message) {
        toast.success(res.message);
      } else {
        toast.error('Invalid credentials or login failed.');
      }
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(processForm)} className="flex w-full flex-col gap-4">
        <div>
          <Input
            type="text"
            placeholder="Name"
            disabled={isSubmitting}
            className="h-10"
            {...register('name')}
          />

          {errors.name && <p className="mt-2 text-sm text-red-400">{errors.name.message}</p>}
        </div>

        <div>
          <Input
            type="email"
            placeholder="Email"
            disabled={isSubmitting}
            className="h-10"
            {...register('email')}
          />

          {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email.message}</p>}
        </div>

        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            disabled={isSubmitting}
            className="h-10"
            {...register('password')}
          />

          <button
            onClick={() => setShowPassword((prev) => (prev === false ? true : false))}
            className="absolute top-2 right-4 cursor-pointer"
          >
            {showPassword ? <PiEye className="h-6 w-6" /> : <PiEyeClosed className="h-6 w-6" />}
          </button>

          {errors.password && (
            <p className="mt-2 text-sm text-red-400">{errors.password.message}</p>
          )}
        </div>

        <div className="relative">
          <Input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm password"
            disabled={isSubmitting}
            className="h-10"
            {...register('confirmPassword')}
          />

          <button
            onClick={() => setShowConfirmPassword((prev) => (prev === false ? true : false))}
            className="absolute top-2 right-4 cursor-pointer"
          >
            {showConfirmPassword ? (
              <PiEye className="h-6 w-6" />
            ) : (
              <PiEyeClosed className="h-6 w-6" />
            )}
          </button>

          {errors.confirmPassword && (
            <p className="mt-2 text-sm text-red-400">{errors.confirmPassword.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full text-lg disabled:opacity-50"
          variant="outline"
        >
          Sign-up
        </Button>
      </form>

      <div className="mt-4 flex items-center justify-center gap-1.5 text-sm font-light">
        <p>Already have an account? </p>
        <div className="font-medium text-blue-400">
          <Link href="/log-in">Sign in</Link>
        </div>
      </div>

      <ProviderLogin />

      <Link href="/" className="mt-5 flex items-center justify-center gap-2">
        <FaArrowLeft className="h-4 w-4" />
        <p>Back home</p>
      </Link>
    </>
  );
}
