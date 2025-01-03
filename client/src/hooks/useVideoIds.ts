import { useCallback } from "react";
import Axios from "axios";

type transcriptElement = {
  text: string;
  duration: number;
  offset: number;
  lang: string;
};

type VideoObject = {
  videoId: string;
  title: string;
  cueString: string;
  timeStamp: number;
};

const useVideoIds = () => {
  // Fetches the ids of all videos on a YouTube channel
  const fetchVideoIds = useCallback(
    async (channelUrl: string): Promise<string[]> => {
      try {
        const response = await Axios.get(
          "http://localhost:5000/api/video-ids",
          {
            params: { channelUrl },
          }
        );
        return response.data;
      } catch (error) {
        console.error("ERROR FETCHING DATA:", error);
        return [];
      }
    },
    []
  );

  // Fetchs the title of a specific YouTube video
  const fetchTitle = useCallback(async (videoId: string): Promise<string> => {
    try {
      const response = await fetch(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
      );
      const data = await response.json();
      return data.title || "Title not found";
    } catch (error) {
      console.error(`ERROR FETCHING TITLE FOR: ${videoId}:`, error);
      return "Title not found";
    }
  }, []);

  // Fetches the transcript of a specific YouTube video
  const fetchTranscript = useCallback(
    async (videoId: string): Promise<transcriptElement[]> => {
      try {
        const response = await Axios.get(
          "http://localhost:5000/api/video-transcript",
          {
            params: { videoId },
          }
        );
        console.log(
          "\x1b[36m%s\x1b[0m",
          "got transcript for",
          videoId,
          response.data[0].duration
        );

        const transcriptData: transcriptElement[] = response.data.map(
          (item: any) => ({
            text: item.text,
            duration: item.duration,
            offset: item.offset,
            lang: item.lang,
          })
        );

        return transcriptData;
      } catch (error) {
        console.error("ERROR FETCHING TRANSCRIPTS:", error);
        return [];
      }
    },
    []
  );

  // Produces the flat list of all separate transcript cues from all videos on a given channel
  const fetchTranscriptCues = async (
    channelUrl: string
  ): Promise<VideoObject[]> => {
    try {
      const videoIds = await fetchVideoIds(channelUrl);

      const transcriptCues: VideoObject[] = [];

      for (const videoId of videoIds) {
        const [title, transcript] = await Promise.all([
          fetchTitle(videoId),
          fetchTranscript(videoId),
        ]);

        transcript.forEach((item) => {
          transcriptCues.push({
            videoId,
            title,
            cueString: item.text,
            timeStamp: item.offset,
          });
        });
      }

      return transcriptCues;
    } catch (error) {
      console.error("ERROR CREATING TRANSCRIPTCUES:", error);
      return [];
    }
  };

  // Filters the cues if their string contains a keyword, capped at 24 cues
  const filterCues = (transcriptCues: VideoObject[], keyword: string) => {
    const filtered: VideoObject[] = [];
    for (const cue of transcriptCues) {
      if (cue.cueString.includes(keyword)) {
        filtered.push(cue);
      }
      if (filtered.length >= 24) {
        break;
      }
    }
    return filtered;
  };

  return { fetchTitle, fetchTranscriptCues, filterCues };
};

export { useVideoIds };
export type { VideoObject };
