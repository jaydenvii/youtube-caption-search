import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {useVideoIds} from "../hooks/useVideoIds";
import { transcriptElement } from "../hooks/useVideoIds";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";


const VideosPage: React.FC = () => {
  const location = useLocation();
  const { channelUrl } = location.state || {};

  const [videosData, setVideosData] = useState<{ videoId: string; transcript: transcriptElement[] }[]>([]);

  const { fetchVideoIds, fetchTranscript } = useVideoIds();
  
   useEffect(() => {
    const fetchData = async () => {
      const videoId = "dQw4w9WgXcQ";
      try {
        const transcript = await fetchTranscript(videoId);
        console.log("Transcript for video ID:", videoId, transcript);
      } catch (error) {
        console.error("Error fetching transcript:", error);
      }
    };

    fetchData();
  }, [fetchTranscript]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const videos = await fetchVideoIds(channelUrl);
        const videoInfo = await Promise.all(
          videos.map(async videoId => ({  
            videoId,
            transcript: await fetchTranscript(videoId)
          }))
        );
        setVideosData(videoInfo);
        console.log("%cVideosData:", "color: green;", videoInfo);

      } catch (error) {
        console.error("ERROR FETCHING VIDEO IDS:", error);
      }
    };

    fetchData();
  }, [channelUrl]);

  return (
    <>
      <div className="hgrid place-items-center fixed top-0 left-0 right-0">
        <Card
          title=""
          description=""
          color="bg-gray-100"
          children={<SearchBar Display={channelUrl} />}
        />
      </div>

      <div className="flex flex-wrap -mx-1">
        {videosData.map(videoData => (
          <div
            key={videoData.videoId}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4"
          >
            <Card
              title={`${videoData.transcript[0].text}` || 'No transcript available'}
              description=""
              imageUrl={`https://img.youtube.com/vi/${videoData.videoId}/0.jpg`}
              color="bg-gray-100"
              link={`https://www.youtube.com/watch?v=${videoData.videoId}`}
              link_title="VID NAME"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default VideosPage;