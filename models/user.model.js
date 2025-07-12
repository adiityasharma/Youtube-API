import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  channelName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  logoUrl: {
    type: String,
    default: null
  },
  logoId: {
    type: String,
  },
  subscriber: {
    type: Number,
    default: 0
  },
  subscribedChannel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

}, { timestamps: true });

const userModel = mongoose.model("User", userSchema);

export default userModel;

