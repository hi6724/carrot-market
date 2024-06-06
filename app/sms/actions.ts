'use server';

import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import db from '@/lib/db';
import { redirect } from 'next/navigation';
import validator from 'validator';
import { z } from 'zod';
import { UserService } from '@/lib/services/userService';
import twilio from 'twilio';

const phoneSchema = z
  .string()
  .trim()
  .refine(
    (phone) => validator.isMobilePhone(phone, 'ko-KR'),
    'Wrong phone format'
  );

async function tokenExists(token: number) {
  const exists = await db.sMSToken.findUnique({
    where: {
      token: token.toString(),
    },
    select: {
      id: true,
    },
  });
  return !!exists;
}

const tokenSchema = z.coerce
  .number()
  .min(100000)
  .max(999999)
  .refine(tokenExists, 'This token does not exist.');

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
  const requestToken = formData.get('token');
  const userService = new UserService();
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
      const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);
      await client.messages.create({
        body: `Your Carrot verification code is: ${token}`,
        from: process.env.TWILIO_PHONE_NUMBER!,
        to: process.env.MY_PHONE_NUMBER!,
      });
      return { token: true };
    }
  }

  const result = await tokenSchema.safeParseAsync(requestToken);
  if (!result.success) return { token: true, error: result.error.flatten() };
  const token = await db.sMSToken.findUnique({
    where: { token: result.data.toString() },
    select: { id: true, userId: true },
  });
  await db.sMSToken.delete({
    where: { id: token!.id },
  });
  await userService.loginAndRedirect(token!.userId);
  return { token: true };
}
