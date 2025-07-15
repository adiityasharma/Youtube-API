import express from "express";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import bodyParser from 'body-parser';

import { ConnectDB } from "./config/db.config.js";
import userRoutes from "./routes/user.routes.js"; 
import videoRoutes from "./routes/video.routes.js"; 

dotenv.config()
const PORT = process.env.PORT || 3002;

const app = express();
ConnectDB()

app.use(bodyParser.json());

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/"
}))

app.use("/api/v1/user", userRoutes);
app.use("api/v1/video", videoRoutes)



app.get("/", (req, res) => {
  res.send("hi")
})

app.listen(PORT, () => {
  console.log("Server Started...")
})