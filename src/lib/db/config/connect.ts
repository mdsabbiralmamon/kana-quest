import mongoose from "mongoose";

const connectDB = async (): Promise<boolean> => {
  // Check if there’s already an existing MongoDB connection
  if (mongoose.connections[0].readyState) {
    console.log("MongoDB is already connected.");
    return true;
  }

  try {
    // MongoDB URI Check
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error("MONGODB_URI is not defined in the environment variables.");
    }

    // Connect to MongoDB
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected successfully.");
    return true;
  } catch (error: unknown) {
    // Catch error
    if (error instanceof Error) {
      console.error("Error connecting to MongoDB:", error.message);
    } else {
      console.error("An unknown error occurred while connecting to MongoDB:", error);
    }
    throw new Error("Failed to connect to MongoDB.");
  }
};

export default connectDB;