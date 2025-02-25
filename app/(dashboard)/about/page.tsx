'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

function AboutPage() {
  const route = useRouter();
  return <div onClick={() => route.push('/home')}>about</div>;
}

export default AboutPage;
