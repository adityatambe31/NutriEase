import mongoose from "mongoose";

let cachedConnection: typeof mongoose | null = null;

export async function connectToDatabase() {
  const mongoUri = process.env.MONGODB_URI || "";
  if (!mongoUri) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }

  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    const connection = await mongoose.connect(mongoUri);
    cachedConnection = connection;
    return connection;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}
