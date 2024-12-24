// routes/videoRoutes.mjs
import express from "express";
import Video from "../models/Video.js";
import cloudinary from "../config/cloudinary.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Upload video and thumbnail
router.post(
  "/upload",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
        const { title, description } = req.body;
        console.log(title, description);

      if (!req.files || !req.files.thumbnail || !req.files.video) {
        return res.status(400).json({ message: "Both thumbnail and video are required" });
        }
        
 // Upload thumbnail
 const thumbnailResult = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "image", folder: "thumbnails" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    uploadStream.end(req.files.thumbnail[0].buffer);
  });

  // Upload video
  const videoResult = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "video", folder: "videos" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    uploadStream.end(req.files.video[0].buffer);
  });
        
      // Create new video document
      const video = new Video({
        title,
        description,
        thumbnail: {
          public_id: thumbnailResult.public_id,
          url: thumbnailResult.secure_url,
        },
        videoUrl: {
          public_id: videoResult.public_id,
          url: videoResult.secure_url,
        },
        duration: videoResult.duration,
        author: "Anonymous", // You can modify this based on your auth system
        views: "0",
        likes: 0,
      });

      await video.save();
      res.status(201).json(video);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error uploading video", error: error.message });
    }
  }
);

// Get all videos
router.get("/videos", async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching videos", error: error.message });
  }
});

// Get single video by ID
router.get("/videos/:id", async (req, res) => {
    try {
        console.log("hit");
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.json(video);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching video", error: error.message });
  }
});

export default router;
