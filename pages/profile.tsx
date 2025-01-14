import axios from "axios";
import { useState } from "react";

export default function Profile() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    uploader: "User123",
  });
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("uploader", formData.uploader);

    if (videoFile) form.append("video", videoFile);
    if (thumbnailFile) form.append("thumbnail", thumbnailFile);

    try {
      const response = await axios.post("/api/upload", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(`${response}: Video uploaded successfully!`);
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      {message && <b>{message}</b>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="block w-full p-2 border rounded"
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="block w-full p-2 border rounded"
        ></textarea>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
          className="block w-full"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
          className="block w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Upload Video
        </button>
      </form>
    </div>
  );
}
