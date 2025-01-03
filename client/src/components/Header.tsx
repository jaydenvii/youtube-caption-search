import React from "react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1
        className="text-6xl text-center text-blue-700 pt-3 hover:cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        YouTube Caption Search
      </h1>
      <h2 className="text-2xl text-center text-blue-500 pt-3 pb-10">
        Search Engine for a YouTube Channel
      </h2>
    </div>
  );
};

export default Header;
