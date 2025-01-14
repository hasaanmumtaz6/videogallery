import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image"

interface Video {
  _id: string;
  title: string;
  description: string;
  videoPath: string;
  thumbnail: string;
  uploader: string;
}

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("/api/videos");
        setVideos(response.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Video Gallery</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {videos.map((video) => (
          <Link key={video._id} href={`/video/${video._id}`}>
            <div className="cursor-pointer">
              <Image src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover rounded" />
              <h2 className="mt-2 font-semibold">{video.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
