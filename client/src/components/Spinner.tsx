import BeatLoader from "react-spinners/BeatLoader";

const override: React.CSSProperties = {
  display: "block",
  margin: "100px auto",
};

interface SpinnerProps {
  loading: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ loading }) => {
  return (
    <BeatLoader
      color="#1d4ed8"
      loading={loading}
      cssOverride={override}
      size={25}
    />
  );
};

export default Spinner;
