import { IVideo } from "@/models/Video";

export type VideoFormData = Omit<IVideo, "_id">;

type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: Record<string, string>;
  body?: unknown;
  signal?: AbortSignal;
};

class ApiClient {
  private async fetch<T>(
    endpoint: string,
    options: FetchOptions = {}
  ): Promise<T> {
    const { method = "GET", body, headers = {}, signal } = options;

    const defaultHeaders = {
      "Content-Type": "application/json",
      ...headers,
    };

    const response = await fetch(`/api${endpoint}`, {
      method,
      headers: defaultHeaders,
      body: body ? JSON.stringify(body) : null,
      signal,
      credentials: "same-origin", // ✅ Added this line
    });
    console.log("response ", response);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  }

  async getVideos(): Promise<IVideo[]> {
    return this.fetch<IVideo[]>("/video");
  }
  async getVideoById(id: string): Promise<IVideo> {
    return this.fetch<IVideo>(`/video/${id}`);
  }

  async createVideo(video: VideoFormData): Promise<IVideo> {
    return this.fetch<IVideo>("/video", {
      method: "POST",
      body: video,
    });
  }
}

export const apiClient = new ApiClient();
