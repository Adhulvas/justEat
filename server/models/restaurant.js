import mongoose from "mongoose";

const restuarantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    phone: {
      type: Number,
      required: true,
      // unique: true
    },
    outlet: {
      type: String,
      required: true
    },
    image: {
      type: String,
      default: 'https://cdn-icons-png.flaticon.com/512/3132/3132693.png'
    },
    openingHours: {
      type: String,
      default: '9:00 AM - 10:00 PM'
    }
  },
  { timestamps: true }
);

export default mongoose.model("Restuarant", restuarantSchema)