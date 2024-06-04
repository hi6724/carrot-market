import { fetchAsync } from '../utils';

interface IGithubEmail {
  email: string;
  primary: boolean;
}

export async function getGithubEmail(access_token: string) {
  const { email } = (
    await fetchAsync('https://api.github.com/user/emails', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: 'no-cache',
    })
  ).find((el: IGithubEmail) => el.primary);
  return email;
}
