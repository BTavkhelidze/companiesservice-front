import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';

    const body = await req.json();

    const response = await axios.post(
      'http://localhost:3000/auth/signUp-users',
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
  } catch (err: any) {
    console.log(err.response);
    return NextResponse.json({
      status: err.response.data.statusCode,
      message: err.response.data.message,
    });
  }
}
