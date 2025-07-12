import express from "express";
import dotenv from "dotenv";
import { ConnectDB } from "./config/db.config.js";


dotenv.config()

const app = express();
ConnectDB()


const PORT = process.env.PORT || 3002;

app.get("/", (req, res) => {
  res.send("hi")
})

app.listen(PORT, () => {
  console.log("Server Started...")
})