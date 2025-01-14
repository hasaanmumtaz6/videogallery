import { GetServerSideProps } from "next";
import { mongooseConnection } from "@/utils/mongo";
import Video from "@/models/Video";
import Head from "next/head";

interface VideoProps {
  video: {
    _id: string;
    title: string;
    description: string;
    videoPath: string;
    thumbnail: string;
    uploader: string;
  };
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  await mongooseConnection();
  const { id } = context.query;
  const video = await Video.findById(id);
  return {
    props: {
      video: JSON.parse(JSON.stringify(video)),
    },
  };
};

const VideoPage = ({ video }: VideoProps) => {
  return (
    <div>
      <Head>
        <title>{video?.title}</title>
      </Head>

      <div className="playerAndLike_Container px-14 py-6">
        <div className="w-[700px] h-[450px]">
          <video controls className="w-full h-full rounded-lg overflow-hidden">
            <source src={video?.videoPath} />
          </video>
        </div>
        <h4>{video?.title}</h4>
        <p>{video.description}</p>
        <a
          href={video.videoPath}
          download
          className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded"
        >
          Download Video
        </a>
      </div>
    </div>
  );
};

export default VideoPage;
