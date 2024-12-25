import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a YouTube Channel"
      />
      <button onClick={handleButtonClick}>Search</button>
    </div>
  );
};

export default SearchBar;
