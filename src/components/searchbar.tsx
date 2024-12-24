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
      <p>a search bar</p> 
      <input
        type="search"
        placeholder="Search here"
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        value={searchInput}
      />
      
    </div>
  );
};

export default SearchBar;
