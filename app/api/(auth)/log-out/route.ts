import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out' });
  if (response.cookies.get('accesstoken')) {
    response.cookies.delete('accesstoken');
  }
  response.cookies.delete('usertoken');

  return response;
}
