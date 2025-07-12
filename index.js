import express from "express";
import dotenv from "dotenv";


dotenv.config()

const app = express();

const PORT = process.env.PORT || 3002;

app.get("/", (req, res) => {
  res.send("hi")
})

app.listen(PORT, () => {
  console.log("Server Started...")
})