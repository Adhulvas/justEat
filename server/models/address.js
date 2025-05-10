import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  doorNo: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  landmark: {
    type: String,
    required: true,
  },
  label: {
    type: String, // Home, Work, Other
    enum: ['Home', 'Work', 'Other'],
    default: 'Home',
  }
}, { timestamps: true });

export default mongoose.model('Address', addressSchema);
