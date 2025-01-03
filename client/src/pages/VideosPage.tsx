import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useVideoIds } from "../hooks/useVideoIds";
import { VideoObject } from "../hooks/useVideoIds";
import Card from "../components/Card";
import KeywordField from "../components/KeywordField";

const VideosPage: React.FC = () => {
  // Video data
  const location = useLocation();
  const { channelUrl } = location.state || {};

  const [transcriptCues, setTranscriptCues] = useState<VideoObject[]>([]);
  const [filteredCues, setFilteredCues] = useState<VideoObject[]>([]);

  const { fetchTranscriptCues, filterCues } = useVideoIds();

  // Keyword data
  const [keyword, setKeyword] = useState("");

  // Fetches cues
  useEffect(() => {
    const fetchData = async () => {
      const flatVideoList = await fetchTranscriptCues(channelUrl);
      setTranscriptCues(flatVideoList);
    };

    fetchData();
  }, [channelUrl]);

  // Filters cues every time there is a new keyword
  useEffect(() => {
    if (keyword) {
      const filteredResults = filterCues(transcriptCues, keyword);
      setFilteredCues(filteredResults);
    }
  }, [keyword]);

  const handleKeywordSubmit = (keyword: string) => {
    setKeyword(keyword);
  };

  return (
    <>
      <div className="hgrid place-items-center fixed top-0 left-0 right-0">
        <Card
          title=""
          description=""
          keyword=""
          color="bg-gray-100"
          children={<KeywordField onSubmit={handleKeywordSubmit} />}
        />
      </div>

      {keyword ? (
        <div className="flex flex-wrap -mx-1">
          {filteredCues.map((cue, index) => (
            <div
              key={`${cue.videoId}-${index}`}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4"
            >
              <Card
                title={
                  <a
                    href={`https://www.youtube.com/watch?v=${cue.videoId}&t=${cue.timeStamp}s`}
                    target="_blank"
                    className="text-blue-500 hover:underline"
                  >
                    {cue.title || "Loading title..."}
                  </a>
                }
                description={`${cue.cueString}` || "Caption not found"}
                keyword={keyword}
                thumbnailUrl={`https://img.youtube.com/vi/${cue.videoId}/0.jpg`}
                color="bg-gray-100"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p>Enter a keyword</p>
        </div>
      )}
    </>
  );
};

export default VideosPage;
