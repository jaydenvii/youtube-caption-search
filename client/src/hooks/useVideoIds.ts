import { useCallback } from "react";
import Axios from "axios";

type transcriptElement={
  text: string;
  duration: number;
  offset: number;
  lang: string;
}


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
        console.log('\x1b[36m%s\x1b[0m', "got transcript for", videoId, response.data[0].duration); 

        const transcriptData: transcriptElement[] = response.data.map((item: any) => ({
          text: item.text,
          duration: item.duration,
          offset: item.offset,
          lang: item.lang,
        }));
        
        return transcriptData;
      } catch (error) {
        console.error("ERROR FETCHING TRANSCRIPTS:", error);
        return [];
      }
    },
    []
  );

  return { fetchVideoIds, fetchTranscript };
};

export { useVideoIds };
export type { transcriptElement };
