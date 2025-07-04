/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { upload } from "@imagekit/next";
import axios from "axios";
import { useState } from "react";

// File upload props interface
interface FileUploadProps {
    onSuccess: (res: any) => void;
    onProgress: (progress: number) => void;
    fileType?: "image" | "video" | "file";
}

// FileUpload component for uploading files to ImageKit
const FileUpload = ({ onSuccess, onProgress, fileType }: FileUploadProps) => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [progress, setProgress] = useState<number>(0);

    // File validation function
    const validateFile = (file: File) => {
        if (fileType === "video" || fileType === "image") {
            if (!file.type.startsWith("video/") && !file.type.startsWith("image/")) {
                throw new Error("Invalid file type. Please upload a video/image file.");
            }
        }
        if (file.size > 100 * 1024 * 1024) {
            // 100 MB limit
            throw new Error("File size exceeds the limit of 100 MB.");
        }
    };

    // Handle file selection only (no upload yet)
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            validateFile(file);
            setSelectedFile(file);
            setError(null);
        } catch (error: any) {
            setError(error instanceof Error ? error.message : "An error occurred in file validation.");
            setSelectedFile(null);
        }
    };

    // Handle upload when button is clicked
    const handleUpload = async () => {
        if (!selectedFile) return;

        setUploading(true);
        setError(null);
        setProgress(0);

        try {
            const authResponse = await axios.get("/api/imagekit-auth");
            const { authenticationParameters } = authResponse.data;

            const uploadResult = await upload({
                file: selectedFile,
                fileName: selectedFile.name,
                publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
                signature: authenticationParameters.signature,
                expire: authenticationParameters.expire,
                token: authenticationParameters.token,
                onProgress: (progressEvent: ProgressEvent<EventTarget>) => {
                    if (progressEvent.lengthComputable && onProgress) {
                        const percent = Math.round(
                            (progressEvent.loaded * 100) / (progressEvent.total || 1)
                        );
                        setProgress(percent);
                        onProgress(percent);
                    }
                },
                abortSignal: new AbortController().signal,
            });
            console.log("Upload result:", uploadResult);
            onSuccess(uploadResult);
            console.log("File uploaded successfully:", uploadResult);

            setSelectedFile(null);
        } catch (error) {
            console.error("Upload failed:", error);
            setError("Upload failed. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-3">
            <input
                type="file"
                accept={fileType === "video" ? "video/*" : "image/*"}
                onChange={handleFileSelect}
                disabled={uploading}
            />

            {selectedFile && (
                <p className="text-sm text-gray-600 ">
                    Selected file: {selectedFile.name}
                </p>
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}

            {uploading && (
                <p className="text-blue-500 text-sm">Uploading... {progress}%</p>
            )}

            <button
                onClick={handleUpload}
                disabled={!selectedFile || uploading}
                className={`px-4 py-2 rounded ${!selectedFile || uploading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 hover:cursor-pointer"
                    }`}
            >
                {uploading ? "Uploading..." : "Upload"}
            </button>
        </div>
    );
};

export default FileUpload;
