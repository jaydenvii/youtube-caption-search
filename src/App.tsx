import { useState } from "react";
import "./App.css";
import SearchBar from "./components/searchbar";
import YouTubeVideoList from "./components/getContent";

function App() {


  return (
    <div className="App">
      <SearchBar />
      <h1>Video List</h1>
      <YouTubeVideoList />
    </div>
  );
}

export default App;
