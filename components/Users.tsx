'use client';
import { useUsers } from '@/app/zustand/users';

import React, { useEffect } from 'react';

export const Users = () => {
  const { users, fetchUsers } = useUsers();
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (!users) return null;
  return (
    <div className='px-2 flex flex-col gap-4 '>
      Users:
      {users.map((user, i) => {
        return (
          <div
            key={i}
            className='bg-yellow-300 flex  gap-3 w-full p-4 border-2 '
          >
            <p>fullName: {user.fullName}</p>
            <p>email: {user.email}</p>
            <div className='self-end'>delete</div>
          </div>
        );
      })}
    </div>
  );
};
