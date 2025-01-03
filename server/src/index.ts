import express, { Request, Response } from "express";
import puppeteer from "puppeteer";
import { YoutubeTranscript } from "youtube-transcript";

const app = express();
const port = 5000;

app.use(express.json());
var cors = require("cors");

app.use(cors());

// Delays code being run
const delay = (time: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

// Scrapes video ids from a YouTube channel
const scrapeVideoIds = async (
  channelUrl: string
): Promise<string[] | undefined> => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(`${channelUrl}/videos`);
    await page.setViewport({ width: 1280, height: 800 });

    let previousHeight = 0;
    let videoIds: Set<string> = new Set();

    while (true) {
      // Scroll to the bottom
      await page.evaluate(() => {
        window.scrollTo(0, document.documentElement.scrollHeight);
      });

      await delay(2000);

      // Gets the ids of all videos and add to the set
      const newVideoIds = await page.evaluate(() => {
        const videoElements = Array.from(
          document.querySelectorAll("#video-title")
        );
        return videoElements
          .map((el) => el.closest("a")?.getAttribute("href")?.slice(-11))
          .filter((id): id is string => !!id);
      });

      newVideoIds.forEach((id) => videoIds.add(id));

      // Check if scrolling has reached the bottom
      const currentHeight = await page.evaluate(
        () => document.documentElement.scrollHeight
      );
      if (currentHeight === previousHeight) break;

      previousHeight = currentHeight;
    }

    return Array.from(videoIds);
  } catch (error) {
    console.error("ERROR FETCHING VIDEOS:", error);
    return undefined;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

app.get("/api/video-ids", async (req: Request, res: Response) => {
  try {
    const channelUrl: string = req.query.channelUrl as string;

    const videos: string[] | undefined = await scrapeVideoIds(channelUrl);

    if (videos) {
      res.json(videos);
    } else {
      res.status(500).send("FAILED TO FETCH VIDEO IDS");
    }
  } catch (error) {
    console.error("ERROR CALLING api/video-ids", error);
    res.status(500).send("ERROR CALLING api/video-ids");
  }
});

app.get("/api/video-transcript", async (req, res) => {
  const videoId: string = req.query.videoId as string;
  const language = "en";

  try {
    // const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    const transcript = await YoutubeTranscript.fetchTranscript(videoId, {
      lang: language,
    });
    console.log("transcript", transcript);
    res.json(transcript);
  } catch (error) {
    console.error("ERROR CALLING api/video-transcript", error);
    res.status(500).send("ERROR CALLING api/video-transcript");
  }
});

app.listen(port, () => {
  console.log("SERVER RUNNING ON PORT", port);
});
