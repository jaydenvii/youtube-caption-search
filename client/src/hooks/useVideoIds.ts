import Axios from "axios";

const useVideoIds = () => {
  const fetchVideoIds = async (channelUrl: string): Promise<string[]> => {
    try {
      const response = await Axios.get("http://localhost:5000/api/video-ids", {
        params: {
          channelUrl,
        },
      });

      console.log(response.data);

      return response.data;
    } catch (error) {
      console.error("ERROR FETCHING DATA:", error);
      return [];
    }
  };

  return fetchVideoIds;
};

export default useVideoIds;
