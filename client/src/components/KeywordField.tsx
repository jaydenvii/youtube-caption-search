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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Enter a keyword"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default KeywordField;
