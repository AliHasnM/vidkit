import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Video, { IVideo } from "@/models/Video";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

// Function to Get Video
export async function GET() {
  try {
    await connectToDatabase();
    const videos = await Video.find({}).sort({ createdAt: -1 }).lean();

    if (!videos || videos.length === 0) {
      return Response.json(
        { error: "No videos found or not available." },
        { status: 404 }
      );
    }

    return Response.json(videos, { status: 200 });
  } catch (error) {
    console.error("Error fetching video:", error);
    return Response.json({ error: "Failed to fetch video." }, { status: 500 });
  }
}

// Function to Create Video
export async function POST(request: NextRequest) {
  try {
    // Check if the user is authenticated
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    // Connect to the database
    await connectToDatabase();
    // Parse the request body
    const body: IVideo = await request.json();
    if (
      !body.title ||
      !body.description ||
      !body.videoUrl ||
      !body.thumbnailUrl
    ) {
      return Response.json(
        {
          error:
            "Title, description, video URL and thumbnail URL are required.",
        },
        { status: 400 }
      );
    }

    // Create a video data
    const videoData: IVideo = {
      title: body.title,
      description: body.description,
      videoUrl: body.videoUrl,
      thumbnailUrl: body.thumbnailUrl,
      controls: body.controls ?? true, // Default to true if not provided
      transformation: {
        width: body.transformation?.width ?? 1080, // Default width
        height: body.transformation?.height ?? 1920, // Default height
        quality: body.transformation?.quality ?? 100, // Default quality
      },
    };
    // Create a new video document
    const newVideo = new Video(videoData);
    // Save the video document to the database
    await newVideo.save();
    // Return the created video
    return Response.json(newVideo, { status: 201 });
  } catch (error) {
    console.error("Error creating video:", error);
    return Response.json({ error: "Failed to create video." }, { status: 500 });
  }
}
