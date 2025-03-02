import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  console.log(process.env.NEST_PUBLIC_URL, 'urllllll');
  try {
    const body = await req.json();

    const response = await axios.post(
      `${process.env.NEST_PUBLIC_URL}/auth/company-signIn`,
      body,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const setCookieHeader = response.headers['set-cookie'];

    const nextResponse = NextResponse.json(
      { status: response.data }
      // { status: 200 }
    );

    if (setCookieHeader) {
      const cookies = Array.isArray(setCookieHeader)
        ? setCookieHeader
        : [setCookieHeader];

      cookies.forEach((cookie) => {
        nextResponse.headers.append('Set-Cookie', cookie);
      });
    }

    return nextResponse;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json(
      { message: error.response?.data?.message || 'Internal server error' },
      { status: error.response?.status || 500 }
    );
  }
}
