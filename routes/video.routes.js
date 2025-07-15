import mongoose from "mongoose";
import express, { Router } from "express";

import Video from "../models/video.model.js";
import user from "../models/user.model.js";
import cloudinary from "../config/cloudinary.js";
import {checkAuth} from "../middleware/auth.middleware.js"

const router = Router();

router.post("/upload", checkAuth ,async (req, res) => {
  try {
    const { title, description, category, tags } = req.body;
    
    if (!req.files || !req.files.video || !req.files.thumbnail) {
      return res.status(400).json({error: "Video and thumbnail are required"})
    }

    const videoUpload = await cloudinary.uploader.upload(req.files.video.tempFilePath, { resource_type: "video", folder: "videos" });

    const thumbnailUpload = await cloudinary.uploader.upload(req.files.thumbnail.tempFilePath, { folder: "thumbnails" });

    const newVideo = new Video({
      title,
      description,
      category,
      user_id: req.user._id,
      videoUrl: videoUpload.secure_url,
      thumbnailUrl: thumbnailUpload.secure_url,
      videoId: videoUpload.public_id,
      thumbnailId: thumbnailUpload.public_id,
      tags: tags ? tags.split(",") : [],
      
    })

    await newVideo.save();

    res.status(200).json({message: "video uplaoded successfully", video: newVideo})

  } catch (error) {
    console.log(error);
    res.status(500).json({error: "something went wrong", message: error.message})
  }
})

router.put("/update/:id", checkAuth, async (req, res) => {
  try {
    const { title, description, tags, category } = req.body;
    const videoId = req.params.id;

    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({error: "videos not found"})
    }

    if (video.user_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "unauthorized" });
    }

    if (req.files && req.files.thumbnail) {
      await cloudinary.uploader.destroy(video.thumbnailId);

      const newThumbnail = await cloudinary.uploader.upload(req.files.thumbnail.tempFilePath, { folder: "thumbnail" });

      video.thumbnailUrl = newThumbnail.secure_url;
      video.thumbnailId = newThumbnail.public_id;
    }

    video.title = title || video.title;
    video.description = description || video.description;
    video.tags = tags? tags.split(",") : video.tags;
    video.category = category || video.category;

    await video.save();

    res.status(201).json({ message: "video updated successfully", video });
    
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "something went wrong", message: error.message });
  }
})


export default router;
