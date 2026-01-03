import mongoose from "mongoose";
import { env } from "../config/env.js";

export async function connectDB() {
  mongoose.set("strictQuery", true);
  await mongoose.connect(env.MONGO_URI);
console.log("✅ Mongo connected:", mongoose.connection.name);
console.log("✅ Mongo host:", mongoose.connection.host);
}
