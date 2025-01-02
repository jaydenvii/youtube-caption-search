"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const youtube_transcript_1 = require("youtube-transcript");
const app = (0, express_1.default)();
const port = 5000;
app.use(express_1.default.json());
var cors = require("cors");
app.use(cors());
// Delays code being run
function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
// Scrapes video ids from a YouTube channel
function scrapeVideoIds(channelUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield puppeteer_1.default.launch({ headless: true });
        const page = yield browser.newPage();
        try {
            yield page.goto(`${channelUrl}/videos`);
            yield page.setViewport({ width: 1280, height: 800 });
            let previousHeight = 0;
            let videoIds = new Set();
            while (true) {
                // Scroll to the bottom
                yield page.evaluate(() => {
                    window.scrollTo(0, document.documentElement.scrollHeight);
                });
                yield delay(2000);
                // Gets the ids of all videos and add to the set
                const newVideoIds = yield page.evaluate(() => {
                    const videoElements = Array.from(document.querySelectorAll("#video-title"));
                    return videoElements
                        .map((el) => { var _a, _b; return (_b = (_a = el.closest("a")) === null || _a === void 0 ? void 0 : _a.getAttribute("href")) === null || _b === void 0 ? void 0 : _b.slice(-11); })
                        .filter((id) => !!id);
                });
                newVideoIds.forEach((id) => videoIds.add(id));
                // Check if scrolling has reached the bottom
                const currentHeight = yield page.evaluate(() => document.documentElement.scrollHeight);
                if (currentHeight === previousHeight)
                    break;
                previousHeight = currentHeight;
            }
            return Array.from(videoIds);
        }
        catch (error) {
            console.error("ERROR FETCHING VIDEOS:", error);
            return undefined;
        }
        finally {
            if (browser) {
                yield browser.close();
            }
        }
    });
}
app.get("/api/video-ids", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const channelUrl = req.query.channelUrl;
        const videos = yield scrapeVideoIds(channelUrl);
        if (videos) {
            res.json(videos);
        }
        else {
            res.status(500).send("FAILED TO FETCH VIDEO IDS");
        }
    }
    catch (error) {
        console.error("ERROR CALLING api/video-ids", error);
        res.status(500).send("ERROR CALLING api/video-ids");
    }
}));
app.get("/api/video-transcript", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const videoId = req.query.videoId;
    console.log("fetching transcript ");
    try {
        const transcript = yield youtube_transcript_1.YoutubeTranscript.fetchTranscript(videoId);
        console.log("transcript", transcript);
        res.json(transcript);
    }
    catch (error) {
        console.error("ERROR CALLING api/video-transcript", error);
        res.status(500).send("ERROR CALLING api/video-transcript");
    }
}));
app.listen(port, () => {
    console.log("SERVER RUNNING ON PORT", port);
});
