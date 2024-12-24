import React, {useState} from 'react'

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [displayText, setDisplayText] = useState("");

  const handleChange = (e: any) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setDisplayText(searchInput);
      setSearchInput(""); // clear input after enter
    }
  };

  return (
    <div>
      <input
        type="search"
        placeholder="Search here"
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        value={searchInput}
      />
      <div>
        <p>{displayText}</p> 
        {/* display input */}
      </div>
      <table>
        <thead>
          <tr>
            <th>smth</th>
            <th>hi</th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default SearchBar;
