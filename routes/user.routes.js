import express, { Router } from "express";
import bcrypt from "bcrypt";
import cloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";


const router = Router();


router.post("/signup", async (req, res) => {
  if (!req.body) {
    throw new Error("required field can't be empty.")
  }
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const uploadImage = await cloudinary.uploader.upload(req.files.logoUrl.tempFilePath);

    const newUser = new User({
      channelName: req.body.channelName,
      email: req.body.email,
      username: req.body.username,
      phone: req.body.phone,
      password: hashedPassword,
      logoUrl: uploadImage.secure_url,
      logoId: uploadImage.public_id
    })

    const user = await newUser.save();

    res.status(201).json({ user });

  } catch (error) {
    console.log(error)
    throw new Error("Error while uploading image: ", error)
  }
})

export default router;