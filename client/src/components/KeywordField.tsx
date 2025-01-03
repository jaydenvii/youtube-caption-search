import React, { useState } from "react";

interface KeywordFieldProps {
  onSubmit: (value: string) => void;
}

const KeywordField: React.FC<KeywordFieldProps> = ({ onSubmit }) => {
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(keyword);
    setKeyword("");
  };

  return (
    <div className="flex justify-center pt-1">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border rounded px-2 py-1 w-[20vw] h-8"
          placeholder="Enter a keyword"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default KeywordField;
