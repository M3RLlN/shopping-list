import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const user = process.env.MONGO_USER;
    const password = process.env.MONGO_PASSWORD;
    const host = process.env.MONGO_HOST || "localhost";
    const port = process.env.MONGO_PORT || "27017";
    const dbName = process.env.MONGO_DB || "shoppinglist";

    await mongoose.connect(
      `mongodb://${user}:${password}@${host}:${port}/${dbName}?authSource=admin`,
    );

    console.log("MONGODB CONNECTED SUCCESSFULLY");
  } catch (error) {
    console.error("Error connecting to MONGODB", error);
    process.exit(1);
  }
};
