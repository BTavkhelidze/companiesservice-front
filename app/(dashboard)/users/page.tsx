'use client';
import AddNewUser from '@/components/AddNewUser';
import { Users } from '@/components/Users';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import React from 'react';

function UsersPage() {
  const router = useRouter();

  const addVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  return (
    <div className='px-3 md:px-[50px] mt-10 overflow-x-hidden'>
      <motion.p
        initial={{ y: '-40px' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className='font-semibold text-xl mb-10  cursor-pointer'
        onClick={() => router.push('/home')}
      >
        {'< '}
      </motion.p>

      <div className='pt-4'>
        <motion.div
          variants={addVariants}
          initial='hidden'
          animate='visible'
          className='w-[150px] cursor-pointer'
        >
          <AddNewUser />
        </motion.div>
        <div className='mt-10 px-8'>
          <Users />
        </div>
      </div>
    </div>
  );
}

export default UsersPage;
