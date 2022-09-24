import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).end();
}

export default withHandler("POST", handler);
