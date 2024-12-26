import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useVideoIds from "../hooks/useVideoIds";

const VideosPage: React.FC = () => {
  const location = useLocation();
  const { channelUrl } = location.state || {};

  const [videoIds, setVideoIds] = useState<string[]>([]);

  const fetchVideoIds = useVideoIds();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videos = await fetchVideoIds(channelUrl);
        setVideoIds(videos);
      } catch (error) {
        console.error("ERROR FETCHING VIDEO IDS:", error);
      }
    };

    fetchData();
  }, [channelUrl]);

  return (
    <ul>
      {videoIds.map((video, index) => (
        <li key={index}>{video}</li>
      ))}
    </ul>
  );
};

export default VideosPage;
