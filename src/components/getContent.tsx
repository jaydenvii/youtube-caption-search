import React, { useState, useEffect } from "react";

const apiKey: string = "AIzaSyAuJFQwGJwan9eiqoD6UkomfPznQ_ydqVc";
const channelId: string = "UC_qb9wZ7gi6T2nXZEHDcnTQ";

interface VideoThumbnail {
  url: string;
  width: number;
  height: number;
}

interface VideoSnippet {
  title: string;
  publishedAt: string;
  thumbnails: {
    default: VideoThumbnail;
  };
}

interface VideoItem {
  id: {
    videoId: string;
  };
  snippet: VideoSnippet;
}

interface YouTubeAPIResponse {
  nextPageToken?: string;
  items: VideoItem[];
}

interface Video {
  title: string;
  videoId: string;
  publishedAt: string;
  thumbnails: {
    default: VideoThumbnail;
  };
}

// Fetches all videos on a YouTube channel
async function fetchYouTubeVideos(): Promise<Video[]> {
  const videos: Video[] = [];
  let nextPageToken: string | undefined = "";

  while (nextPageToken !== undefined) {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&order=date&part=snippet&type=video&pageToken=${nextPageToken}`;

    try {
      const response = await fetch(url);
      const data: YouTubeAPIResponse = await response.json();

      data.items.forEach((item) => {
        videos.push({
          title: item.snippet.title,
          videoId: item.id.videoId,
          publishedAt: item.snippet.publishedAt,
          thumbnails: item.snippet.thumbnails,
        });
      });

      nextPageToken = data.nextPageToken;
    } catch (error) {
      console.error("Error fetching videos:", error);
      break;
    }
  }

  return videos;
}

// YouTube Videos Component
const YouTubeVideoList: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const fetchedVideos = await fetchYouTubeVideos();
        setVideos(fetchedVideos);
      } catch (err) {
        console.error("Failed to fetch videos", err);
        setError("Failed to load videos.");
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {videos.map((video) => (
        <li key={video.videoId} style={{ marginBottom: "20px" }}>
          <h3>{video.title}</h3>
          <p>Published on: {new Date(video.publishedAt).toLocaleDateString()}</p>
          <img
            src={video.thumbnails.default?.url || ""}
            alt={video.title}
            style={{ borderRadius: "8px", width: "200px" }}
          />
        </li>
      ))}
    </ul>
  );
};

export default YouTubeVideoList;
