import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema (
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    name: { type: String },
    foodItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoodItem",
      required: true
    },
    restuarant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restuarant",
      default: null
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      trim: true
    },
    images: {
      type: [String],
      default: []
    },
    createdAt: {
      type:Date,
      default: Date.now
    }
  }
)

export default mongoose.model("Review", reviewSchema)