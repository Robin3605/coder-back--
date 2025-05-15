import mongoose from "mongoose";
import logger from "../helpers/logger.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_PASSWORD);
    logger.INFO(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.ERROR("Error connecting to database:", error.message);
    process.exit(1); 
  }
};