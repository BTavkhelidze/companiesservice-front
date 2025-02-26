import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    const response = await axios.get(
      'http://localhost:3000/companies/allUsers',
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieHeader,
        },
      }
    );
    console.log(response.data, 'responsssssssssssssse');
    return NextResponse.json({ status: 201, data: response.data });
  } catch (err) {
    return NextResponse.json(err);
  }
}
