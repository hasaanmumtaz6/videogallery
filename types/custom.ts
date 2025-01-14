import { NextApiRequest } from "next";

export interface NextApiRequestWithFiles extends NextApiRequest {
  files: {
    video?: Express.Multer.File[];
    thumbnail?: Express.Multer.File[];
  };
}
