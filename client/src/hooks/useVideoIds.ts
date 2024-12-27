import { useCallback } from "react";
import Axios from "axios";

const useVideoIds = () => {
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

  return fetchVideoIds;
};

export default useVideoIds;
