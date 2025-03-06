import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const filePath = await req.json();
    // console.log(filePath, 'filePath');
    const cookieHeader = req.headers.get('cookie') || '';
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/users/getFile`,
      { filePath: filePath },
      {
        withCredentials: true,

        headers: {
          Cookie: cookieHeader,
        },
      }
    );
    console.log(response.data, 'data');
    console.log(filePath, 'filePath');
    return NextResponse.json(response.data);
  } catch (err) {
    console.log(err);
    return NextResponse.json(' error: ');
  }
}
