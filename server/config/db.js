import {connect} from 'mongoose';

export const connectDB = async () => {
  try {
    const response = await connect(process.env.MONGO_URI)
    console.log('db connected successfully')
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
  }
}