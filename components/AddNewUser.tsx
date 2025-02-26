'use client';
import React, { useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';

import { Button } from './ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { useUsers } from '@/app/zustand/users';

const formSchema = z.object({
  email: z.string().email(),
  fullName: z.string(),

  password: z.string(),
});
function AddNewUser() {
  const { addUser, fetchUsers } = useUsers();
  const { error } = useUsers();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
    },
  });

  const handleSubmit = async (formData: any) => {
    const newUser = {
      fullName: formData.fullName,
      password: formData.password,
      email: formData.email,
    };

    try {
      addUser(newUser);

      if (!error) setOpen(false);
      form.reset();
      setOpen(false);
    } catch (err) {
      console.error(err);
    }

    // const createUser = async () => {
    //   try {
    //     const result = await axios.post('/api/signUp-user', newUser, {
    //       withCredentials: true,
    //     });
    //     if (result.data.status === 201) {
    //       setOpen(false);
    //       toast('wo so easy');
    //     }
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // createUser();
  };
  return (
    <div className=''>
      {' '}
      <div className='absolute left-2 bottom-0 '>
        <ToastContainer />
      </div>
      <div onClick={() => setOpen(true)}>Add New User</div>
      <AnimatePresence>
        {open && (
          <motion.div
            className='w-full h-full absolute z-10 bg-black opacity-50 top-0 left-0'
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0 }}
          >
            {' '}
          </motion.div>
        )}
        {open && (
          <div className='w-full h-full absolute flex items-center justify-center top-0'>
            <motion.div
              className='w-[400px] rounded-xl  absolute z-20 bg-white opacity-20  p-3'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              exit={{ opacity: 0 }}
            >
              <div onClick={() => setOpen(false)} className='mb-6'>
                x
              </div>
              <FormProvider {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className='gap-5 flex flex-col'
                >
                  <FormField
                    control={form.control}
                    name='fullName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>User Name</FormLabel>
                        <FormControl>
                          <Input placeholder='Company Name' {...field} />
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
                  {error && <p>{error}</p>}
                  <Button>Sign Up</Button>
                </form>
              </FormProvider>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AddNewUser;
