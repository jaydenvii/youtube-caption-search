import ChannelField from "../components/ChannelField";
import Header from "../components/Header";

const HomePage: React.FC = () => {
  return (
    <>
      <Header />
      <p className="text-lg text-center">
        Paste the link of a YouTube channel and search for keywords in its
        captions!
      </p>
      <ChannelField />
    </>
  );
};

export default HomePage;
