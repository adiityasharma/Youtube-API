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


export default router;
