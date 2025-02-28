'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import axios from 'axios';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { passwordMatchSchema } from '@/validation/passwordMatchSchema';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuthStore } from '@/app/zustand/AuthStore';

const signInSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(4, 'pasword must contain al least 5 character')
    .max(20, 'pasword must contain  maximum 20 character'),
});

export default function SignInPage() {
  const router = useRouter();
  const [signInAsCompany, setSignInAsCompany] = useState(true);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: async () => {
      return { email: '', password: '', passwordConfirm: '' };
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (formData: any) => {
    setErrorMessage(undefined);

    try {
      const requestData = {
        email: formData.email,
        password: formData.password,
      };

      const endpoint = signInAsCompany ? '/api/sign-in' : '/api/sign-inUser';

      const data = await axios.post(endpoint, requestData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (data.data.status === 200 && data.data.role === 'company') {
        console.log(data, 'data.data.role ');
        console.log('here', data.data.role === 'company');
        // form.reset();
        router.push('/home');
      }
      if (data.data.status === 200 && data.data.role === 'user') {
        form.reset();
        console.log('here', data.data.role === 'user');
        router.push('/dashboard/home');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Login error:', error);

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Authentication failed';

      setErrorMessage(
        errorMessage === 'Invalid credentials'
          ? 'Wrong email or password'
          : errorMessage
      );

      formData.password = '';
    }
  };
  return (
    <main className='flex justify-center items-center min-h-screen'>
      <Card className='w-[550px] p-6'>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription className='pt-4'>
            {signInAsCompany
              ? 'Register your company account'
              : 'Register as a user'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className='gap-5 flex flex-col'
              onChange={() => setErrorMessage(undefined)}
            >
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='Email' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Password'
                        type='password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='h-6'>
                {errorMessage && <p className='text-red-400'>{errorMessage}</p>}
              </div>
              <Button type='submit'>Sign In</Button>
            </form>
          </FormProvider>
        </CardContent>
        <CardFooter className=' flex flex-col'>
          <div className='flex gap-4 mb-4 w-full justify-center'>
            <Button
              variant={signInAsCompany ? 'default' : 'outline'}
              onClick={() => {
                setSignInAsCompany(true);
                form.reset();
              }}
            >
              Sign in as Company
            </Button>
            <Button
              variant={!signInAsCompany ? 'default' : 'outline'}
              onClick={() => {
                setSignInAsCompany(false);
                form.reset();
              }}
            >
              Sign in as User
            </Button>
          </div>
          <p>
            {' '}
            try{' '}
            <span
              className='cursor-pointer text-blue-400 underline font-semibold'
              onClick={() => router.push('/sign-up')}
            >
              {' '}
              Sign Up{' '}
            </span>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
