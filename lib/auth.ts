export async function getSession(request?: Request) {
  const rawCookie = request?.headers.get('cookie') || '';

  const cookie = rawCookie
    .split(';')
    .find((el) => el.includes('accesstoken'))
    ?.split('=')[1];
  let role;
  if (cookie) {
    role = 'company';
  }
  if (!cookie) return null;

  try {
    return { cookie: cookie, role: role };
  } catch (error) {
    console.error(error);
    return null;
  }
}
