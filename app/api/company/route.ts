import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const data = await req.json();
  const cookieHeader = req.headers.get('cookie') || '';

  const res = await axios.post(
    `http://localhost:3000/companies/updatePlan`,
    data,
    {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieHeader,
      },
    }
  );

  return NextResponse.json(res.status);
}
