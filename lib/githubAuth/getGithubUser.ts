import { fetchAsync } from '../utils';

export async function getGithubUser(access_token: string) {
  const { id, login, avatar_url } = await fetchAsync(
    'https://api.github.com/user',
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: 'no-cache',
    }
  );
  return { github_id: `${id}`, nickname: login, avatar: avatar_url };
}
