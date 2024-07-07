import mongoose from "mongoose";
import logger from "../utils/logger";
import dotenv from "dotenv";


/**
 * Confiqures the connection to mongo]db
 *
 * @returns A mongodb connection promise.
 *
 * @throws If there is an error connecting to the MongoDB database.
 */
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL ?? "");

    logger.info(`MongoDB Connected:`, { message: connection.connection.host });
    return connection;
  } catch (error) {
    logger.error("MongoDB connection error:", { stack: error });
    process.exit(1);
  }
};


export default connectDB;
