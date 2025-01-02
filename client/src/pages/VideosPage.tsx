import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useVideoIds } from "../hooks/useVideoIds";
import { VideoObject } from "../hooks/useVideoIds";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";

const VideosPage: React.FC = () => {
  const location = useLocation();
  const { channelUrl } = location.state || {};

  const [transcriptCues, setTranscriptCues] = useState<VideoObject[]>([]);

  const fetchTranscriptCues = useVideoIds();

  // Fetches cues
  useEffect(() => {
    const fetchData = async () => {
      const flatVideoList = await fetchTranscriptCues(channelUrl);
      setTranscriptCues(flatVideoList);
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
        {transcriptCues.map((cue) => (
          <div
            key={cue.videoId}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4"
          >
            <Card
              title={`${cue.cueString}` || "No transcript available"}
              description=""
              imageUrl={`https://img.youtube.com/vi/${cue.videoId}/0.jpg`}
              color="bg-gray-100"
              link={`https://www.youtube.com/watch?v=${cue.videoId}`}
              link_title="VID NAME"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default VideosPage;
