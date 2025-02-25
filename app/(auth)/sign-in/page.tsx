'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getCookie, setCookie } from 'cookies-next';
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

const userSchema = z
  .object({
    email: z.string().email(),
  })
  .and(passwordMatchSchema);

const companySchema = z
  .object({
    email: z.string().email(),
    companyName: z.string().min(2, 'Company name is required'),
  })
  .and(passwordMatchSchema);

export default function SignInPage() {
  const router = useRouter();
  const [signInAsCompany, setSignInAsCompany] = useState(true);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const formSchema = signInAsCompany ? companySchema : userSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: async () => {
      return signInAsCompany
        ? { email: '', password: '', passwordConfirm: '', companyName: '' }
        : { email: '', password: '', passwordConfirm: '' };
    },
  });

  const handleSubmit = async (formData: any) => {
    setErrorMessage(undefined);

    try {
      const requestData = {
        email: formData.email,
        password: formData.password,
        ...(signInAsCompany && { name: formData.companyName }),
      };

      const endpoint = signInAsCompany ? '/api/sign-in' : '/api/user-signin';

      const { data, status } = await axios.post(endpoint, requestData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (status === 200) {
        form.reset();
        router.push('/home');
      }
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
              {signInAsCompany && (
                <FormField
                  control={form.control}
                  name='companyName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder='Company Name' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

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

              <FormField
                control={form.control}
                name='passwordConfirm'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Confirm Password'
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
