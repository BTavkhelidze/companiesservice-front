'use client';
import Logout from '@/components/Logout';
import FileUpload from '@/components/UploadFile';
import { fetchCurrentUser } from '@/service/api';
import axios from 'axios';

import React, { useEffect, useState } from 'react';

interface IUser {
  _id: string;
  _v: string;
  fullName: string;
  filesUrl: [];
  email: string;
  companyId: string;
}

function HomePage() {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);

  const [filePath, setFilePath] = useState<[] | null>(null);
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

  useEffect(() => {
    const getFiles = async () => {
      const response = await axios.post('/api/getFiles', user?.filesUrl);
      setFilePath(response.data);
    };
    getFiles();
  }, [user]);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return null;
  }

  return (
    <div className='px-3 md:px-[50px] mt-10'>
      <div className='w-full gap-14 flex'>
        <h1>user : {user.fullName}</h1>
        <div className='cursor-pointer'>
          <Logout />
        </div>
      </div>
      <div className=' w-full grid   pt-7  gap-5 300  flex-wrap'>
        <div className='justify-self-end'>
          <FileUpload />
        </div>
        <div className=' w-full justify-self-start'>
          {filePath && user.filesUrl && (
            <div className=' flex flex-col gap-10'>
              {' '}
              {user.filesUrl.map((file, i) => (
                <div
                  key={i}
                  className='p-2 bg-slate-300 flex justify-between cursor-default'
                >
                  {' '}
                  {file}
                  {filePath && (
                    <div>
                      <a
                        href={filePath[i]}
                        download={`download.${file}`}
                        className='download-button cursor-pointer'
                      >
                        ↓ Download File
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
