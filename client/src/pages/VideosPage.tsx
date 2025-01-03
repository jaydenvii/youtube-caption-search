import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useVideoIds } from "../hooks/useVideoIds";
import { VideoObject } from "../hooks/useVideoIds";
import Header from "../components/Header";
import Spinner from "../components/Spinner";
import KeywordField from "../components/KeywordField";
import CueGrid from "../components/CueGrid";

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

  // Handles when the user submits a new keyword
  const handleKeywordSubmit = (keyword: string) => {
    setKeyword(keyword);
  };

  return (
    <>
      <Header />
      {transcriptCues.length > 0 ? (
        <>
          <p className="text-center">
            Videos from{" "}
            <a href={channelUrl} className="text-blue-500 hover:underline">
              {channelUrl.replace("https://www.youtube.com/", "")}
            </a>{" "}
            have been loaded! Fill out the form:
          </p>
          <KeywordField onSubmit={handleKeywordSubmit} />

          {keyword ? (
            <CueGrid filteredCues={filteredCues} keyword={keyword} />
          ) : (
            <></>
          )}
        </>
      ) : (
        <div className="text-center">
          <Spinner loading={transcriptCues.length === 0} />
          <p className="mt-[-5rem] text-lg">
            Loading videos from{" "}
            <a href={channelUrl} className="text-blue-500 hover:underline">
              {channelUrl.replace("https://www.youtube.com/", "")}
            </a>
            ...
          </p>
        </div>
      )}
    </>
  );
};

export default VideosPage;
