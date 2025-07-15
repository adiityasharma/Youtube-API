import mongoose, { model, Schema } from "mongoose";

const videoSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  videoUrl: {
    required: true,
    type: String,
    trim: true,
  },
  videoId: {
    required: true,
    type: String,
    trim: true
  },
  thumbnailUrl: {
    type: String,
    trim: true,
    required: true
  },
  thumbnailId: {
    type: String,
    trim: true,
    required: true,
  },
  category: {
    type: String,
    trim: true,
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  likes: {
    type: Number,
    default: 0,
    min: 0
  },
  dislikes: {
    type: Number,
    default: 0,
    min: 0
  },
  views: {
    type: Number,
    default: 0,
    min: 0
  },
  likeBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  dislikeBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  viewedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true })


videoSchema.virtual("likes").get(function () {
  return this.likeBy.length
})
videoSchema.virtual("dislike").get(function () {
  return this.dislikeBy.length;
})
videoSchema.virtual("views").get(function () {
  return this.viewedBy.length
})

videoSchema.set('toJSON', { virtuals: true });
videoSchema.set('toObject', { virtuals: true });

const videoModel = model("Video", videoSchema);

export default videoModel;