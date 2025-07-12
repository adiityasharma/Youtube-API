import mongoose from "mongoose";

export const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected.")
  } catch (error) {
    console.log(error.message)
    throw new Error(error || "Something went wrong")
  }
}
