'use server';

import db from '@/lib/db';
import type { Prisma } from 'prisma/prisma-client';

export async function getUser(
  args: Prisma.UserWhereUniqueInput,
  select?: Prisma.UserSelect
) {
  const user = await db.user.findUnique({ where: { ...args }, select });
  return user;
}
