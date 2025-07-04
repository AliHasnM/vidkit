"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";
import { IVideo } from "@/models/Video";
import VideoCard from "./components/VideoCard";

export default function HomePage() {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiClient
      .getVideos()
      .then(setVideos)
      .catch(() => setError("Failed to load videos."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold mb-4">🎥 Latest Videos</h1>

      {loading ? (
        <p>Loading videos...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : videos.length === 0 ? (
        <p>No videos found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <VideoCard key={video._id?.toString()} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}
