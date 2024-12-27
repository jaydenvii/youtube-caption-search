import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface SearchBarProps {
  Display?: string; 
}

const SearchBar: React.FC<SearchBarProps> = ({ Display = "" }) => {
  const [input, setInput] = useState<string>(Display);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      if (location.pathname === "/videos") {
        // If already on VideosPage, update the state without navigation
        navigate("/", { state: { channelUrl: input }, replace: true });
      } else {
        // If on another page, navigate to VideosPage
        navigate("/videos", { state: { channelUrl: input } });
      }
    } else {
      alert("Please paste the link of a YouTube channel");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border rounded-l px-2 py-1 w-[500px] h-8"
        placeholder="Enter a YouTube channel URL"
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

export default SearchBar;
