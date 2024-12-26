import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";

const SearchBar: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const navigate = useNavigate();

  // Routes the user to the videos page
  const handleButtonClick = () => {
    if (input.trim()) {
      navigate("/videos", { state: { channelUrl: input } });
    } else {
      alert("Please paste the link of a YouTube channel");
    }
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a YouTube Channel"
        className="border rounded-l px-2 py-1 w-[500px] h-8"
        //  style={{ transition: 'width 0.2s' }}
      />
      <button
        onClick={handleButtonClick}
        className="bg-purple-400 text-white px-4 py-1 rounded-r"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
