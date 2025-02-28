import axios from 'axios';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    console.log(body, 'daratats');
    const cookieHeader = req.headers.get('cookie') || '';
    console.log(cookieHeader, 'daratats');

    // const response = await axios.get(
    //   'http://localhost:3000/companies/delete-user',

    //   {
    //     withCredentials: true,
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Cookie: cookieHeader,
    //     },
    //   }
    // );

    return NextResponse.json('response.data');
  } catch (err) {
    console.log(err);
    return NextResponse.json(' error: ');
  }
}
