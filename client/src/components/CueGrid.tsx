import React from "react";
import Card from "./Card";
import { VideoObject } from "../hooks/useVideoIds";

interface CueGridProps {
  filteredCues: VideoObject[];
  keyword: string;
}

const CueGrid: React.FC<CueGridProps> = ({ filteredCues, keyword }) => {
  // Formats the time stamp into minutes and seconds
  const formatTimestamp = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-wrap m-8">
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
                {cue.title || "Loading title..."} (
                {formatTimestamp(cue.timeStamp)})
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
  );
};

export default CueGrid;
