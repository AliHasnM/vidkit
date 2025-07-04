"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";
import { IVideo } from "@/models/Video";
import VideoCard from "./components/VideoCard";

export default function HomePage() {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .getVideos()
      .then(setVideos)
      .catch((err) => console.error("Error loading videos:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-4">🎥 Latest Videos</h1>
      {loading ? (
        <p>Loading videos...</p>
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


// import { IVideo } from "@/models/Video"; // already present
// import { apiClient } from "@/lib/api-client";
// import VideoCard from "./components/VideoCard";

// export default async function HomePage() {
//   let videos: IVideo[] = []; // ✅ Add this type annotation

//   try {
//     videos = await apiClient.getVideos(); // returns IVideo[]
//   } catch (error) {
//     console.error("Error loading videos:", error);
//   }

//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-bold mb-4">🎥 Latest Videos</h1>
//       {videos.length === 0 ? (
//         <p>No videos found.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {videos.map((video) => (
//             <VideoCard key={video._id?.toString()} video={video} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
