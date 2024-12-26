import React from "react";
import SearchBar from "../components/searchbar";
import Card from "../components/Card";


const HomePage = () => {
  return <div className="h-screen grid place-items-center"> <Card title=""
          description=""
          color = "bg-gray-100"
          children = {<SearchBar />}/> </div>;
};

export default HomePage;
