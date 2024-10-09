import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to MongoDB Database: ${conn.connection.host}`.green);
  } catch (error) {
    console.log(`Error in MongoDB: ${error.message}`.bgRed.white);
    process.exit(1);
  }
};

export default connectDB;
