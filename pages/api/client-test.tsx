import { NextApiRequest, NextApiResponse } from "next";
import client from "../../libs/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await client.user.create({
    data: { email: "test@coo.com", name: "test" },
  });

  res.json({ ok: true, data: data });
}
