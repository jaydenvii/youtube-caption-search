import SearchBar from "../components/SearchBar";
import Card from "../components/Card";
import useVideoIds from "../hooks/useVideoIds";
// import Navigation from "../components/NavigationBar";

const HomePage: React.FC = () => {
  return (
    <div className="h-screen grid place-items-center static">
      {/* <Navigation></Navigation> */}
      <Card
        title=""
        description=""
        color="bg-gray-100"
        children={<SearchBar/>}
      />
    </div>
  );
};

export default HomePage;
