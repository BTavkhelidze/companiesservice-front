'use client';
import axios from 'axios';
import React, { useEffect } from 'react';

function Logout() {
  const logOut = async () => {
    await axios.post('/api/log-out', { withCradantials: true });
    window.location.reload();
  };

  return <div onClick={() => logOut()}>Logout</div>;
}

export default Logout;
