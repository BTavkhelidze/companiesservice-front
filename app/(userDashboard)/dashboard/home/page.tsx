'use client';
import FileUpload from '@/components/UploadFile';
import { fetchCurrentUser } from '@/service/api';

import React, { useEffect, useState } from 'react';

function HomePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const response = await fetchCurrentUser();
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    getUser();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <div>Not logged in</div>;
  }
  //   const user =
  //   if (!user) return null;

  return (
    <div>
      {' '}
      user name: {user.fullName}
      <FileUpload />
    </div>
  );
}

export default HomePage;
