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
        const transcript = await fetchTranscript(videoId);
        transcript.forEach((item) => {
          transcriptCues.push({
            videoId,
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

  return fetchTranscriptCues;
};

export { useVideoIds };
export type { VideoObject };
