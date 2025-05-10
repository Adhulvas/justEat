import mongoose from "mongoose";

const foodItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    price: {
      type: Number,
      required: true
    },
    discountPrice: { type: Number },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    image: {
      type: String
    },
    isAvailable: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      enum: ["veg","non-veg"],
      required: true
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restuarant",
      required: true
    }   
  },
  {
    timestamps: true
  }
)

export default mongoose.model("FoodItem",foodItemSchema);