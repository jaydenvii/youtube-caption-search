import ChannelField from "../components/ChannelField";

const HomePage: React.FC = () => {
  return (
    <>
      <h1 className="text-6xl text-center text-blue-700 pt-3">
        YouTube Caption Search
      </h1>
      <h2 className="text-2xl text-center text-blue-500 pt-3">
        Search Engine for a YouTube Channel
      </h2>
      <p className="text-lg text-center pt-10">
        Paste the link of a YouTube channel and search for keywords in its
        captions!
      </p>
      <ChannelField />
    </>
  );
};

export default HomePage;
