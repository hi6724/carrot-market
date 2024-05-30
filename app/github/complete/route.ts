import db from '@/lib/db';
import getSession from '@/lib/session';
import { notFound, redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');
  if (!code) return notFound();
  const accessTokenParams = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code,
  }).toString();
  const requestURL = `https://github.com/login/oauth/access_token?${accessTokenParams}`;
  const { error, access_token } = await (
    await fetch(requestURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    })
  ).json();

  if (error) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const { id, login, avatar_url } = await (
    await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: 'no-cache',
    })
  ).json();

  let user = await db.user.findUnique({
    where: {
      github_id: `${id}`,
    },
    select: {
      id: true,
    },
  });

  if (!user) {
    user = await db.user.create({
      data: {
        username: login,
        github_id: `${id}`,
        avatar: avatar_url,
      },
      select: {
        id: true,
      },
    });
  }

  const session = await getSession();
  session.id = user.id;
  await session.save();
  return redirect('/profile');
}