import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useVideoIds from "../hooks/useVideoIds";
import useVideoTranscript from "../hooks/useVideoTranscript"; // Correct import
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";

const VideosPage: React.FC = () => {
  const location = useLocation();
  const { channelUrl } = location.state || {};

  const [videoIds, setVideoIds] = useState<string[]>([]);
  const [transcripts, setTranscripts] = useState<{ [key: string]: string | null }>({});
  const fetchVideoIds = useVideoIds();
  const fetchTranscript = useVideoTranscript(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videos = await fetchVideoIds(channelUrl);
        setVideoIds(videos);
        console.log("VideosPage:", videos);
      } catch (error) {
        console.error("ERROR FETCHING VIDEO IDS:", error);
      }
    };

    fetchData();
  }, [channelUrl, fetchVideoIds]);

  const handleFetchTranscript = async (videoId: string) => {
    try {
      if (!transcripts[videoId]) {
        const transcript = await fetchTranscript(videoId);
        setTranscripts((prev) => ({ ...prev, [videoId]: transcript }));
      }
    } catch (error) {
      console.error("Error fetching transcript:", error);
    }
  };

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
        {videoIds.map((video, index) => (
          <div
            key={index}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4"
          >
            <Card
              title=""
              description=""
              imageUrl={`https://img.youtube.com/vi/${video}/0.jpg`}
              color="bg-gray-100"
              link={`https://www.youtube.com/watch?v=${video}`}
              link_title="VID NAME"
            />
            <button onClick={() => handleFetchTranscript(video)}>
              Fetch Transcript
            </button>
            {transcripts[video] && (
              <div>
                <h3>Transcript:</h3>
                <p>{transcripts[video]}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default VideosPage;
