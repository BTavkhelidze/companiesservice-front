export async function getSession(request?: Request) {
  const rawCookie = request?.headers.get('cookie') || '';

  let cookie;
  let role;

  const companyCookie = rawCookie
    .split(';')
    .find((el) => el.includes('accesstoken'))
    ?.split('=')[1];

  if (companyCookie) {
    role = 'company';
    cookie = companyCookie;
  }

  const userCookie = rawCookie
    .split(';')
    .find((el) => el.includes('usertoken'))
    ?.split('=')[1];

  if (userCookie) {
    role = 'user';
    cookie = userCookie;
  }

  if (!cookie && !userCookie) return null;

  try {
    return { cookie: cookie, role: role };
  } catch (error) {
    console.error(error);
    return null;
  }
}
