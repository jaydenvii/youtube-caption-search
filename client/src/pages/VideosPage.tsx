import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useVideoIds from "../hooks/useVideoIds";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";

const useVideoList = () => {
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
  }, [channelUrl, fetchVideoIds]);

  return videoIds;
};

async function getVideoTitle(videoId:string) {
  const url = `https://www.youtube.com/watch?v=${videoId}`;
  try {
    const response = await fetch(url);
    const html = await response.text();
    const titleMatch = html.match(/<title>(.*?)<\/title>/);
    if (titleMatch && titleMatch[1]) {
      // Remove " - YouTube" from the end of the title
      return titleMatch[1].replace(' - YouTube', '').trim();
    }
    return "";
  } catch (error) {
    console.error("Error fetching video title:", error);
    return "";
  }
}




const VideosPage: React.FC = () => {
  const videoIds = useVideoList();
  const location = useLocation();
  const { channelUrl } = location.state || {};

  return (
    <>
    <div className="hgrid place-items-center">
      <Card
        title=""
        description=""
        color="bg-gray-100"
        children={<SearchBar Display = {channelUrl}/>}
      />
    </div>

    <div className="flex flex-wrap -mx-2">
  {videoIds.map((video, index) => (
    
    <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4">
      <Card 
        title={`${getVideoTitle(video)}`}
        description=""
        imageUrl={`https://img.youtube.com/vi/${video}/0.jpg`}
        color="bg-gray-100"
        link={`https://www.youtube.com/watch?v=${video}`}
        link_title = "VID NAME"
      />
    
    </div>
  ))}
</div>
</>


  );
};

export default VideosPage;
