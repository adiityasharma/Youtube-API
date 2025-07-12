import express from "express";
import dotenv from "dotenv";


import { ConnectDB } from "./config/db.config.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config()
const PORT = process.env.PORT || 3002;

const app = express();
ConnectDB()

app.use("/api/v1/user", userRoutes)



app.get("/", (req, res) => {
  res.send("hi")
})

app.listen(PORT, () => {
  console.log("Server Started...")
})