import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';

    const response = await axios.get(
      'http://localhost:3000/auth/current-company',
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieHeader,
        },
      }
    );

    console.log(response, 'ssssssssssssssssssssssssss');

    return NextResponse.json({
      data: response.data,
      status: response.status,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error fetching company data:', error);
    return NextResponse.json(
      { message: 'Failed to fetch company data' },
      {
        status: error.response?.status || 500,
        headers: {
          'Content-Security-Policy': "default-src 'self'",
          'X-Content-Type-Options': 'nosniff',
        },
      }
    );
  }
}
