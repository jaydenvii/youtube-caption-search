import { useCallback } from "react";
import Axios from "axios";

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
    async (videoId: string): Promise<string[]> => {
      try {
        const response = await Axios.get(
          "http://localhost:5000/api/video-transcript",
          {
            params: { videoId },
          }
        );
        return response.data;
      } catch (error) {
        console.error("ERROR FETCHING TRANSCRIPTS:", error);
        return [];
      }
    },
    []
  );

  return { fetchVideoIds, fetchTranscript };
};

export default useVideoIds;
