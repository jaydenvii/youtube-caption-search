import SearchBar from "../components/SearchBar";
import Card from "../components/Card";

const HomePage: React.FC = () => {
  return (
    <div className="h-screen grid place-items-center">
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
