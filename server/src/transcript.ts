import express, { Request, Response } from "express";
import { YoutubeTranscript } from "youtube-transcript";
// import cors from "cors";

const app = express();
const port = 5000;
app.use(express.json());
var cors = require("cors");
app.use(express.json());
app.use(cors());

// Function to fetch the transcript of a video
async function fetchVideoTranscript(videoId: string): Promise<any> {
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    return transcript;
  } catch (error) {
    console.error("ERROR FETCHING TRANSCRIPT:", error);
    return null;
  }
}

// Endpoint to fetch the transcript of a YouTube video
app.get("/api/video-transcript", async (req: Request, res: Response): Promise<void> => {
  try {
    const videoId: string = req.query.videoId as string;

    if (!videoId) {
      res.status(400).send("videoId query parameter is required");
      return;
    }

    const transcript = await fetchVideoTranscript(videoId);

    if (transcript) {
      res.json(transcript);
    } else {
      res.status(500).send("Failed to fetch the transcript");
    }
  } catch (error) {
    console.error("Error fetching video transcript:", error);
    res.status(500).send("An error occurred while fetching the video transcript");
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
