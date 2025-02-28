'use client';
import FileUpload from '@/components/UploadFile';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface IFile {
  companyId: string[];
  fileUrl: string[];
  isPrivate: boolean;
  privateTo: [];
  userId: string;
  _v: string;
  _id: string;
}

function FilePage() {
  const router = useRouter();
  const [filePath, setFilePath] = useState<[] | null>(null);

  const [allFiles, setAllFiles] = useState<IFile[] | null>(null);
  useEffect(() => {
    const getFiles = async () => {
      try {
        const response = await axios.get('/api/readAllFiles', {
          withCredentials: true,
        });
        setAllFiles(response.data);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };
    getFiles();
  }, []);

  useEffect(() => {
    const getFiles = async () => {
      const response = await axios.get('/api/getAllFiles', {
        withCredentials: true,
      });
      setFilePath(response.data);
      console.log(response, 'saeeeeeeee');
    };
    getFiles();
  }, [allFiles]);

  console.log(filePath, 'allfiles');

  if (!allFiles) {
    return null;
  }

  return (
    <div className='px-3 md:px-[50px] mt-10'>
      <p
        className='font-semibold text-xl mb-10  cursor-pointer'
        onClick={() => router.push('/home')}
      >
        {'< '}
      </p>
      <div className='flex px-10 pt-10 flex-col'>
        <FileUpload />
        <div className='mt-6'>
          {allFiles &&
            allFiles.map((file, i) => {
              return (
                <div key={i} className='bg-slate-300 mb-6 flex justify-between'>
                  {' '}
                  <p>{file.fileUrl}</p>
                  {filePath && (
                    <div>
                      <a
                        href={filePath[i]}
                        download={`download.${file.fileUrl}`}
                        className='download-button cursor-pointer'
                      >
                        ↓ Download File
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default FilePage;
