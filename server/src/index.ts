import express, { Request, Response } from "express";
import puppeteer from "puppeteer";

const app = express();
const port = 5000;

app.use(express.json());
var cors = require('cors')

app.use(cors()) // Use this after the variable declaration

// Scrapes the IDs of all videos on a YouTube channel
async function scrapeVideoIds(
  channelUrl: string
): Promise<string[] | undefined> {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(`${channelUrl}/videos`);
    await page.setViewport({ width: 1280, height: 800 });

    // Scrolls the page
    await page.evaluate(() => {
      window.scrollTo(0, document.documentElement.scrollHeight);
    });

    // Wait for page to have videos loaded in
    await page.waitForFunction(
      () => {
        const videoElements = document.querySelectorAll("#video-title");
        return videoElements.length > 0;
      },
      { timeout: 10000 }
    );

    // Gets the ids of all YouTube videos
    const videos: string[] = await page.evaluate(() => {
      const videoElements = Array.from(
        document.querySelectorAll("#video-title")
      );
      return videoElements
        .map((el) => el.closest("a")?.getAttribute("href")?.slice(-11))
        .filter((id): id is string => !!id);
    });

    return videos;
  } catch (error) {
    console.error("ERROR FETCHING VIDEOS:", error);
    return undefined;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

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

app.listen(port, () => {
  console.log("SERVER RUNNING ON PORT", port);
});
