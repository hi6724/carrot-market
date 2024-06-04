import { NextResponse } from 'next/server';
import { fetchAsync } from '../utils';
import { redirect } from 'next/navigation';

export async function getGithubToken(code: string) {
  const accessTokenParams = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code,
  }).toString();

  const requestURL = `https://github.com/login/oauth/access_token?${accessTokenParams}`;

  const { error, access_token } = await fetchAsync(requestURL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
  });
  if (error) {
    return redirect('/login');
  }
  return access_token;
}
