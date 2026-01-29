import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongoose connected successfully");
  } catch (error) {
    console.log("Connection error", error);
  }
};

export default connectDB;
