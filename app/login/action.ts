'use server';

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from '@/lib/constants';
import db from '@/lib/db';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import getSession from '@/lib/session';
import { redirect } from 'next/navigation';

const checkPassword = async (
  { email, password }: { email: string; password: string },
  ctx: z.RefinementCtx
) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      password: true,
    },
  });
  const ok = await bcrypt.compare(password, user!.password ?? 'xxxx');
  if (!ok) {
    ctx.addIssue({
      code: 'custom',
      message: 'Password not correct',
      path: ['password'],
      fatal: true,
    });
  }
};

const checkEmailExists = async (
  { email }: { email: string },
  ctx: z.RefinementCtx
) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  if (!user) {
    ctx.addIssue({
      code: 'custom',
      message: 'user Not Found',
      path: ['email'],
      fatal: true,
    });
    return z.NEVER;
  }
};

const formSchema = z
  .object({
    email: z.string().email().toLowerCase(),
    password: z
      .string({
        required_error: '비밀번호를 입력해주세요',
      })
      .min(PASSWORD_MIN_LENGTH),
    // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
  })
  .superRefine(checkEmailExists)
  .superRefine(checkPassword);

export async function login(prevState: any, formData: FormData) {
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    const session = await getSession();
    session.id = user!.id;
    await session.save();
    redirect('/profile');
  }
}
