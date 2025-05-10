import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    items: [
      {
        foodItem: { type: mongoose.Schema.Types.ObjectId, ref: "FoodItem", required: true},
        quantity: { type: Number, required: true, default: 1}
      }
    ],
    totalPrice: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
)

export default mongoose.model("Cart", cartSchema)