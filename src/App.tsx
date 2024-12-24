import SearchBar from "./components/searchbar";
import YouTubeVideoList from "./components/getContent";
import Card from "./components/Card.tsx";

function App() {
  return (
    <div className="App">
      <Card
        title="hi"
        description="yes."
        // imageUrl="https://please_help_im_dying_ty"
      >
        <SearchBar />
      </Card>
      <h1>Video List</h1>
      <YouTubeVideoList />
    </div>
  );
}

export default App;
