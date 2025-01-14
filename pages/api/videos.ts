import { NextApiRequest, NextApiResponse } from "next";
import { mongooseConnection } from "@/utils/mongo";
import Video from "@/models/Video";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await mongooseConnection();

  if (req.method === "GET") {
    const videos = await Video.find({});
    res.status(200).json(videos);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default handler;
