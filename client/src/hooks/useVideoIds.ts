import Axios from "axios";

const useVideoIds = () => {
  const fetchVideoIds = async (channelUrl: string) => {
    try {
      const response = await Axios.get(
        `http://localhost:5000/api/video-ids?channelUrl=${channelUrl}`
      );
      const videoIds = response.data;

      return videoIds;
    } catch (error) {
      console.error("ERROR FETCHING DATA:", error);
    }
  };

  return fetchVideoIds;
};

export default useVideoIds;
