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

const formSchema = z
  .object({
    email: z.string().email(),
    companyName: z.string(),
    country: z.string(),
    industry: z.string(),
  })
  .and(passwordMatchSchema);

export default function SignUpPage() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      companyName: '',
      country: '',
      industry: '',
    },
  });

  const handleSubmit = async (formData: any) => {
    const newCompany = {
      name: formData.companyName,
      password: formData.password,
      email: formData.email,
      industry: formData.industry,
      country: formData.country,
    };
    console.log(newCompany, 'sfsaw');

    try {
      const response = await fetch('api/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCompany),
      });
      console.log(response, 'successs');

      if (!response.ok) throw new Error('Registration failed');
      if (response.status === 201) {
        form.reset();
        router.push('/sign-in');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <main className='flex justify-center items-center min-h-screen'>
        <Card className='w-[550px] p-6'>
          <CardHeader>
            <CardTitle>register</CardTitle>
            <CardDescription className='pt-4'>
              Register for a new company
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormProvider {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className='gap-5 flex flex-col'
              >
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

                <FormField
                  control={form.control}
                  name='country'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder='Country' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='industry'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry</FormLabel>
                      <FormControl>
                        <Input placeholder='industry' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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

                <Button>Sign Up</Button>
              </form>
            </FormProvider>
          </CardContent>
          <CardFooter className='w-full text-center flex items-center justify-center'>
            <p>
              {' '}
              try{' '}
              <span
                className='cursor-pointer text-blue-400 underline font-semibold'
                onClick={() => router.push('/sign-in')}
              >
                {' '}
                Sign In{' '}
              </span>
            </p>
          </CardFooter>
        </Card>
      </main>
    </>
  );
}
