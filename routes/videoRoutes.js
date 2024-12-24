// routes/videoRoutes.mjs
import express from "express";
import upload from "../middleware/upload.js";
import { uploadFunction, getVideos, getVideoById } from "../controllers/videoControllers.js";

const router = express.Router();

router.post(
  "/upload",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  uploadFunction
);
router.get("/videos", getVideos);
router.get("/videos/:id", getVideoById);

export default router;
