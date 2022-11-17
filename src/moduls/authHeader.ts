import { validateToken } from '@/moduls/validateToken'

export default async function authHeader() {
  let user = JSON.parse(localStorage.getItem('user') as string);

  const key = await validateToken()

  if (user && key) {
    return { 'Authorization': key };
  } else {
    return {};
  }
}
