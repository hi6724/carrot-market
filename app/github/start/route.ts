import { NextResponse } from 'next/server';

export function GET() {
  const baseURL = 'https://github.com/login/oauth/authorize';
  const params = {
    client_id: process.env.GITHUB_CLIENT_ID!,
    scope: 'read:user,user:email',
    allow_signup: 'true',
  };
  const formattedParams = new URLSearchParams(params).toString();
  return NextResponse.redirect(`${baseURL}?${formattedParams}`);
}
