/* eslint-disable no-console */
import "dotenv/config";
import mongoose from "mongoose";

export async function initDatabase() {
  const DATABASE_URL = process.env.DATABASE_URL;

  mongoose.connection.on("open", () => {
    console.info("successfully connected to database:", DATABASE_URL);
  });

  try {
    await mongoose.connect(DATABASE_URL);
    return mongoose.connection;
  } catch (error) {
    console.error("Database connection error:", error);
  }
}
