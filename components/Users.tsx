'use client';
import { useUsers } from '@/app/zustand/users';
import axios from 'axios';
import { headers } from 'next/headers';
import React, { useEffect } from 'react';

export const Users = () => {
  const { users, fetchUsers } = useUsers();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const removeUser = async (email: string) => {
    console.log(email, ';emaill');
    const response = await axios.delete('/api/deleteUser', { data: email });
    console.log(response);
  };

  if (!users) return null;

  return (
    <div className='space-y-4 p-4'>
      <h2 className='text-xl font-semibold text-gray-800'>Users List</h2>

      <div className='space-y-2'>
        {users.map((user, i) => (
          <div
            key={i}
            className='p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md flex justify-between transition-shadow'
          >
            <div className='flex flex-col space-y-1'>
              <p className='text-gray-700 font-medium'>Name: {user.fullName}</p>
              <p className='text-sm text-gray-500'>Email: {user.email}</p>
            </div>

            <button
              className='mt-2 text-sm text-red-500 hover:text-red-700 transition-colors'
              onClick={() => removeUser(user.email)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
