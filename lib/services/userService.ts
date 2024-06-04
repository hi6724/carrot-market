import db from '../db';
import type { Prisma } from 'prisma/prisma-client';
import getSession, { loginSession } from '../session';
import { redirect } from 'next/navigation';

export class UserService {
  constructor() {}
  async findUnique(args: Prisma.UserFindUniqueArgs) {
    return await db.user.findUnique({ select: { id: true }, ...args });
  }
  async findFirst(args: Prisma.UserFindFirstArgs) {
    return await db.user.findFirst({ select: { id: true }, ...args });
  }
  async update(args: Prisma.UserUpdateArgs) {
    return await db.user.update(args);
  }
  async create(args: Prisma.UserCreateArgs) {
    return await db.user.create({ select: { id: true }, ...args });
  }
  async loginAndRedirect(id: number) {
    await loginSession(id);
    return redirect('/profile');
  }
}
