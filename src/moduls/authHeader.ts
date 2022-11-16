export default function authHeader() {
  let user = JSON.parse(localStorage.getItem('user') as string);

  if (user && user.key) {
    return { 'Authorization': user.key };
  } else {
    return {};
  }
}
