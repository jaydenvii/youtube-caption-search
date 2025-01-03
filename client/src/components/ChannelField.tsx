import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChannelField: React.FC = () => {
  const navigate = useNavigate();

  const [channelUrl, setChannelUrl] = useState<string>("");

  // Sends the user to the videos page with the channelUrl
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (channelUrl.trim()) {
      navigate("/videos", { state: { channelUrl } });
    } else {
      alert("Please paste the link of a YouTube channel");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        type="text"
        value={channelUrl}
        onChange={(e) => setChannelUrl(e.target.value)}
        className="border rounded-l px-2 py-1 w-[700px] h-8"
        placeholder="https://www.youtube.com/@..."
      />
      <button
        type="submit"
        className="bg-purple-400 text-white px-4 py-1 rounded-r"
      >
        Search
      </button>
    </form>
  );
};

export default ChannelField;
