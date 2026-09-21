import dotenv from "dotenv";
import path from "node:path";
import { z } from "zod";

/**
 * Reads and checks all environment variables once, at startup.
 *
 * `MONGO_USER` and `MONGO_PASSWORD` are required. A missing value throws here,
 * with a clear message, instead of failing later with a confusing Mongo error.
 */
// Reads `_docker/.env` so that `process.env` knows the values.
dotenv.config({ path: path.resolve(process.cwd(), "../../_docker/.env") });

const envSchema = z.object({
  MONGO_USER: z.string(),
  MONGO_PASSWORD: z.string(),
  MONGO_HOST: z.string().default("localhost"),
  MONGO_PORT: z.string().default("27017"),
  MONGO_DB: z.string().default("shoppinglist"),
  BASE_URL: z.string().default("http://localhost:3000"),
  CORS_ORIGIN: z.string().default("http://localhost:5173"),
});

const env = envSchema.parse(process.env);

export const config = {
  mongoUri: `mongodb://${env.MONGO_USER}:${env.MONGO_PASSWORD}@${env.MONGO_HOST}:${env.MONGO_PORT}/${env.MONGO_DB}?authSource=admin`,
  baseUrl: env.BASE_URL,
  corsOrigin: env.CORS_ORIGIN,
};
