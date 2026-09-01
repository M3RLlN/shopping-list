import mongoose from "mongoose";

/**
 * Opens the connection to MongoDB.
 *
 * Stops the program if the connection fails.
 * An API without a database cannot answer a single request,
 * so it is better to stop at startup than to fail on every request later on.
 */
export const connectDB = async () => {
  try {
    // Login data from the environment variables. `host`, `port` and `dbName`
    // have a fallback, so the API can start without a complete `.env` file.
    const user = process.env.MONGO_USER;
    const password = process.env.MONGO_PASSWORD;
    const host = process.env.MONGO_HOST || "localhost";
    const port = process.env.MONGO_PORT || "27017";
    const dbName = process.env.MONGO_DB || "shoppinglist";

    // Build the connection string and connect.
    // `authSource=admin`: in MongoDB every database can have its own users.
    // The Docker container creates the user in the `admin` database, not in `shoppinglist`.
    // Without this part Mongo looks in the wrong place and refuses the login.
    await mongoose.connect(
      `mongodb://${user}:${password}@${host}:${port}/${dbName}?authSource=admin`,
    );

    console.log("MONGODB CONNECTED SUCCESSFULLY");
  } catch (error) {
    console.error("Error connecting to MONGODB", error);
    process.exit(1);
  }
};
