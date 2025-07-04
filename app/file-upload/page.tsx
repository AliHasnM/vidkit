/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FileUpload from "../components/FileUpload";
import { apiClient } from "@/lib/api-client";
import { VideoFormData } from "@/lib/api-client";
import Image from "next/image";

const UploadVideoPage = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [videoUrl, setVideoUrl] = useState("");
    const [thumbnailUrl, setThumbnailUrl] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        if (!title || !description || !videoUrl || !thumbnailUrl) {
            setError("All fields including video and thumbnail are required.");
            return;
        }

        setLoading(true);
        setError(null);

        const videoData: VideoFormData = {
            title,
            description,
            videoUrl,
            thumbnailUrl,
            controls: true,
            transformation: {
                width: 1080,
                height: 1920,
                quality: 90,
            },
        };

        try {
            await apiClient.createVideo(videoData);
            router.push("/");
        } catch (err) {
            console.error("Video upload failed:", err);
            setError("Something went wrong while uploading video.");
        } finally {
            setLoading(false);
        }
    };

    if (!session) {
        return <p className="text-center text-lg mt-10">Please login to upload a video.</p>;
    }

    return (
        <div className="max-w-3xl mx-auto py-10 px-4">
            <h1 className="text-2xl font-bold mb-6">Upload New Video</h1>

            <div className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        placeholder="Enter video title"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        rows={4}
                        placeholder="Enter video description"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Upload Thumbnail</label>
                    <FileUpload
                        fileType="image"
                        onSuccess={(res: any) => setThumbnailUrl(res.url)}
                        onProgress={(p) => console.log("Thumbnail upload progress:", p)}
                    />
                    {thumbnailUrl && (
                        <div className="relative w-48 h-32 mt-2">
                            <Image
                                src={thumbnailUrl}
                                alt="Thumbnail Preview"
                                fill
                                className="object-cover rounded border"
                            />
                        </div>
                    )}
                </div>

                <div>
                    <label className="block mb-1 font-medium">Upload Video</label>
                    <FileUpload
                        fileType="video"
                        onSuccess={(res: any) => setVideoUrl(res.url)}
                        onProgress={(p) => console.log("Video upload progress:", p)}
                    />
                    {videoUrl && (
                        <video
                            src={videoUrl}
                            controls
                            className="mt-2 w-full h-64 object-cover rounded border"
                        />
                    )}
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className={`mt-4 px-5 py-2 rounded text-white font-medium ${loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                        }`}
                >
                    {loading ? "Submitting..." : "Submit Video"}
                </button>
            </div>
        </div>
    );
};

export default UploadVideoPage;
