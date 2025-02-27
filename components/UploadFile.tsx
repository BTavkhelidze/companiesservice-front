'use client';

import { useState } from 'react';

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      setError('Please select a file.');
      return;
    }

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        alert('File uploaded successfully!');
        console.log(data);
      } else {
        setError('File upload failed.');
      }
    } catch (error) {
      console.error('Error  uploading file:', error);
      setError('An error occurred while uploading the file.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        placeholder='uload folder'
        type='file'
        accept='.csv,.xls,.xlsx'
        onChange={handleFileChange}
      />
      <button onClick={handleSubmit} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
