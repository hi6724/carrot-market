import { UserService } from './../../../lib/services/userService';
import { loginSession } from '@/lib/session';
import { v4 as uuidv4 } from 'uuid';
import { notFound, redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import {
  getGithubEmail,
  getGithubToken,
  getGithubUser,
} from '@/lib/githubAuth';

export async function GET(request: NextRequest) {
  const userService = new UserService();
  const code = request.nextUrl.searchParams.get('code');
  if (!code) return notFound();

  const token = await getGithubToken(code);
  const { github_id, nickname, avatar } = await getGithubUser(token);
  const email = await getGithubEmail(token);

  const user = await userService.findFirst({
    where: { OR: [{ github_id }, { email }] },
    select: { github_id: true, id: true, email: true },
  });

  if (!user) {
    const newUser = await userService.create({
      data: {
        username: uuidv4(),
        github_id,
        email,
        avatar,
        nickname,
      },
    });
    return userService.loginAndRedirect(newUser.id);
  } else if (user.github_id === github_id) {
    return userService.loginAndRedirect(user.id);
  } else if (user.email === email && !user.github_id) {
    await userService.update({
      where: { email },
      data: { github_id },
    });
    return userService.loginAndRedirect(user.id);
  } else {
    return redirect(`/login?email=${email}`);
  }
}
