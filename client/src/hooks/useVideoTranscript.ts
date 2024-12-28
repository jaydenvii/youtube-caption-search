import { useState, useCallback } from "react";
import Axios from "axios";

const useFetchTranscript = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTranscript = useCallback(async (videoId: string): Promise<string | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await Axios.get("http://localhost:5000/api/transcript", {
        params: { videoId }, // Pass the video ID as a query parameter
      });

      return response.data; // Assuming your API returns the transcript text directly
    } catch (err) {
      console.error("Error fetching transcript:", err);
      setError("Failed to fetch transcript.");
      return null; // Return null on error
    } finally {
      setLoading(false);
    }
  }, []);

  return { fetchTranscript, loading, error };
};

export default useFetchTranscript;
