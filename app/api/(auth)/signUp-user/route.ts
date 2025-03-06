import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';

    const body = await req.json();

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/signUp-users`,
      body,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieHeader,
        },
      }
    );
    console.log(response.data, 'resf');
    return NextResponse.json({ status: 201, message: response.data });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.log(err.response);
    return NextResponse.json({
      status: err.response.data.statusCode,
      message: err.response.data.message,
    });
  }
}
