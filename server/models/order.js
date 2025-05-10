import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    restuarant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restuarant',
      required: true
    },
    items: [
      {
        foodItem: { type: mongoose.Schema.Types.ObjectId, ref: "FoodItem", required: true},
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true}
      }
    ],
    totalAmout: {
      type: Number,
      required: true
    },
    discount: {
      type: Number,
      default: 0
    },
    finalAmount: {
      type: Number,
      required: true
    },
    coupon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Coupon',
      default: null
    },
    paymentMethod: {
      type: String,
      enum: ['cash on delivery','online']
    },
    deliveryAddress: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["placed", "preparing", "out for delivery", "delivered", "cancelled"]
    }
  },
  { timestamps: true }
)

export default mongoose.model("Order",orderSchema)