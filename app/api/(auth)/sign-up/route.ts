export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch(
      `${process.env.NEST_PUBLIC_URL}/auth/company-signUp`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    return response;
  } catch (e) {
    console.log(e);
  }
}
