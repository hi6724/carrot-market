import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function main() {
  [...Array.from(Array(500).keys())].forEach(async (item) => {
    const stream = await client.stream.create({
      data: {
        name: String(`testItem_${item}`),
        description: String(`testItem_${item}`),
        price: item + 100,
        user: {
          connect: {
            id: 1,
          },
        },
      },
    });
    console.log(`${item}/500`);
  });
}

main()
  .catch((e) => console.log(e))
  .finally(() => client.$disconnect());
