'use client';
import { useUsers } from '@/app/zustand/users';
import { animate, motion } from 'framer-motion';
import axios from 'axios';
import { headers } from 'next/headers';
import React, { useEffect, useState } from 'react';
import Modal from './Modal';

export const Users = () => {
  const { loading, users, fetchUsers } = useUsers();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const removeUser = async (email: string) => {
    // console.log(email, ';emaill');
    const response = await axios.delete('/api/deleteUser', { data: email });
    console.log(response);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const userHVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const userDivVariansts = {
    hidden: { opacity: 0, x: '100vw' },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      className='space-y-4 p-4'
    >
      <Modal showModal={showModal} setShowModal={setShowModal} />

      <motion.h2
        variants={userHVariants}
        transition={{ duration: 0.5 }}
        className='text-xl font-semibold text-gray-800'
      >
        Users List
      </motion.h2>

      {loading ? (
        <p>loading...</p>
      ) : (
        <div className='space-y-2 '>
          {users.map((user, i) => (
            <motion.div
              variants={userDivVariansts}
              transition={{ type: 'spring', stiffness: 80 }}
              whileHover={{ scale: 1.007, originX: 0 }}
              key={i}
              className='p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md flex justify-between transition-shadow'
            >
              <div className='flex flex-col space-y-1'>
                <p className='text-gray-700 font-medium'>
                  Name: {user.fullName}
                </p>
                <p className='text-sm text-gray-500'>Email: {user.email}</p>
              </div>

              <button
                className='mt-2 text-sm text-red-500 hover:text-red-700 transition-colors'
                onClick={() => setShowModal(true)}
              >
                Delete
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};
