import mongoose from "mongoose";
import { beforeAll, afterAll } from "@jest/globals";
import { initDatabase } from "../db/init.js";
import { User } from "../models/user.js";

beforeAll(async () => {
  await initDatabase();
});

afterAll(async () => {
  await User.deleteMany({});
  await mongoose.disconnect();
});
