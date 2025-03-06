import { getSession } from '@/lib/auth';
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const session = await getSession(req);

  const url =
    session?.role === 'company'
      ? `${process.env.NEXT_PUBLIC_API_URL}/companies`
      : `${process.env.NEXT_PUBLIC_API_URL}/users`;
  try {
    const formData = await req.formData();
    const cookieHeader = req.headers.get('cookie') || '';

    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Create a new FormData object to forward the file
    const forwardFormData = new FormData();
    forwardFormData.append(
      'file',
      new Blob([await file.arrayBuffer()]),
      file.name
    );

    const response = await axios.post(`${url}/uploadFile`, forwardFormData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
        Cookie: cookieHeader,
      },
    });

    return NextResponse.json(response.data);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
