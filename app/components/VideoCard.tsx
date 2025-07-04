"use client";

import { IVideo } from "@/models/Video";

interface Props {
    video: IVideo;
}

const VideoCard = ({ video }: Props) => {
    return (
        <div className="bg-white shadow rounded overflow-hidden">
            <video
                src={video.videoUrl}
                controls
                width="100%"
                className="w-full h-64 object-cover"
            />
            <div className="p-4">
                <h2 className="font-semibold text-lg">{video.title}</h2>
                <p className="text-gray-600 text-sm">{video.description}</p>
            </div>
        </div>
    );
};

export default VideoCard;
