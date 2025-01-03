import React, { useState } from "react";

interface KeywordFormProps {
  onSubmit: (keyword: string, cardLimit: number) => void;
}

const KeywordForm: React.FC<KeywordFormProps> = ({ onSubmit }) => {
  const [keyword, setKeyword] = useState<string>("");
  const [cardLimit, setCardLimit] = useState<number>(24);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(keyword, cardLimit);
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
        <input
          type="number"
          value={cardLimit}
          onChange={(e) =>
            setCardLimit(e.target.value === "" ? 24 : parseInt(e.target.value))
          }
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

export default KeywordForm;
