import React, {useState} from 'react'

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e: any) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  if (searchInput.length > 0) {
    return searchInput;
  }

  return (
    <div>
      <input
        type="search"
        placeholder="Search here"
        onChange={handleChange}
        value={searchInput}
      />
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
