import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function test() {
  const token = await db.sMSToken.findFirst({
    where: { userId: 1 },
    include: { user: true },
  });
  console.log(token);
}

test();

export default db;
