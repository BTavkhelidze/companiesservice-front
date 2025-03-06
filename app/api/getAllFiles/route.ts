import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/companies/getFile`,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieHeader,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (err) {
    console.log(err);
    return NextResponse.json(' error: ');
  }
}
