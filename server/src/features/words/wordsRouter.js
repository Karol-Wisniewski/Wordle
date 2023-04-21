import wordsService from "./wordsService.js";
import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
    res.json(await wordsService.getAll());
});

export default router;