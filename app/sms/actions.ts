'use server';

import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import db from '@/lib/db';
import { redirect } from 'next/navigation';
import validator from 'validator';
import { z } from 'zod';

const phoneSchema = z
  .string()
  .trim()
  .refine(
    (phone) => validator.isMobilePhone(phone, 'ko-KR'),
    'Wrong phone format'
  );
const tokenSchema = z.coerce.number().min(100000).max(999999);

interface ActionState {
  token: boolean;
}
async function getToken() {
  const token = crypto.randomInt(100000, 999999).toString();
  const exists = await db.sMSToken.findUnique({
    where: { token },
    select: { id: true },
  });
  if (exists) {
    return getToken();
  } else {
    return token;
  }
}

export async function smsLogin(prevState: ActionState, formData: FormData) {
  const phone = formData.get('phone');
  const token = formData.get('token');
  if (!prevState.token) {
    const result = phoneSchema.safeParse(phone);
    if (!result.success) return { token: false, error: result.error.flatten() };
    else {
      // delete 이전토큰
      await db.sMSToken.deleteMany({
        where: { user: { phone: result.data } },
      });
      // create token
      const token = await getToken();
      await db.sMSToken.create({
        data: {
          token,
          user: {
            connectOrCreate: {
              where: { phone: result.data },
              create: {
                username: uuidv4(),
                nickname: 'Incognito',
                phone: result.data,
              },
            },
          },
        },
      });
      // send token
      return { token: true };
    }
  } else {
    const result = tokenSchema.safeParse(token);
    if (!result.success) return { token: true, error: result.error.flatten() };
    else redirect('/');
  }
}
