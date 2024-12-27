import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useVideoIds from "../hooks/useVideoIds";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";
import Navigation from "../components/NavigationBar";

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
        console.log("VideosPage:", videos);
      } catch (error) {
        console.error("ERROR FETCHING VIDEO IDS:", error);
      }
    };

    fetchData();
  }, [channelUrl]);

  return (
    <>
      <div className="hgrid place-items-center fixed top-0 left-0 right-0  ">
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
          </div>
        ))}
      </div>
    </>
  );
};

export default VideosPage;
