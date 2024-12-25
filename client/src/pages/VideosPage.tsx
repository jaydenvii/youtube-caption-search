import { useLocation } from "react-router-dom";

const VideosPage = () => {
  const location = useLocation();
  const { channelUrl } = location.state || {};

  return <div>{channelUrl}</div>;
};

export default VideosPage;
