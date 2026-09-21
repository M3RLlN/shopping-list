import mongoose from "mongoose";

/**
 * Opens the connection to MongoDB.
 *
 * Stops the program if the connection fails.
 * An API without a database cannot answer a single request,
 * so it is better to stop at startup than to fail on every request later on.
 *
 * @param uri - The full Mongo connection string, built once in `apps/api/src/config.ts`
 */
export const connectDB = async (uri: string) => {
  try {
    await mongoose.connect(uri);
    console.log("MONGODB CONNECTED SUCCESSFULLY");
  } catch (error) {
    console.error("Error connecting to MONGODB", error);
    process.exit(1);
  }
};
