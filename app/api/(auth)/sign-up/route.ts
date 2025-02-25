export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log('Received body:', body);
    const response = await fetch('http://localhost:3000/auth/company-signUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    return response;
  } catch (e) {
    console.log(e);
  }
}
