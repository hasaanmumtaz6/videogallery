import multer from "multer";
import { mongooseConnection } from "@/utils/mongo";
import Video from "@/models/Video";

export const config = {
  api: { bodyParser: false },
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(req)
    if (file.mimetype.startsWith("video")) cb(null, "./public/videos");
    else cb(null, "./public/thumbnails");
  },
  filename: (req, file, cb) => {
    console.log(req)
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

const handler = async (req, res) => {
  await mongooseConnection();

  if (req.method === "POST") {
    const uploadMiddleware = upload.fields([
      { name: "video", maxCount: 1 },
      { name: "thumbnail", maxCount: 1 },
    ]);

    uploadMiddleware(req, res, async (err) => {
      if (err) return res.status(500).json({ error: err.message });

      const { title, description, uploader } = req.body;
      const video = req.files?.video?.[0];
      const thumbnail = req.files?.thumbnail?.[0];

      if (!video || !thumbnail) {
        return res
          .status(400)
          .json({ error: "Video and thumbnail are required" });
      }

      const newVideo = await Video.create({
        title,
        description,
        uploader,
        videoPath: `/videos/${video.filename}`,
        thumbnail: `/thumbnails/${thumbnail.filename}`,
      });

      res.status(201).json(newVideo);
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default handler;
