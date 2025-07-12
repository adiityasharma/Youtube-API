import express, { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

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
    res.status(500).json({ error: "something went wrong", message: error.message });
  }
})

router.post("/login", async (req, res) => {
  // console.log(req.body)

  const { email, password } = req.body;

  if (!email && !password) {
    console.log("Username or password required", error);
    throw new Error(error);
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'Invalid Credincials' });
    }

    const checkedPassword = await bcrypt.compare(password, user.password);

    if (!checkedPassword) {
      return res.status(401).json({ error: "Invalid Credincials" })
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email
      },
      process.env.JWT_TOKEN,
      { expiresIn: "3d" }
    );

    res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username
      }
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "something went wrong", message: error.message });
  }
})

export default router;