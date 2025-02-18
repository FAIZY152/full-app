// db.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const connectDB = async () => {
  try {
    const dbUri = process.env.MONGO_URl;

    if (!dbUri) {
      throw new Error("MONGO_URL is not defined in environment variables.");
    }

    await mongoose
      .connect(dbUri)
      .then(() => {
        console.log("✅ Database connection successful.");
      })
      .catch((error) => {
        console.error(`❌ Database connection error: ${error.message}`);
      });
  } catch (error) {
    console.error(`❌ Database connection error: ${error.message}`);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
