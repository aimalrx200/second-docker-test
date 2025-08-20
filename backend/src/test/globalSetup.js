import "dotenv/config";
import { MongoMemoryServer } from "mongodb-memory-server";

export default async function globalSetup() {
  const instance = await MongoMemoryServer.create({
    binary: {
      version: "6.0.4",
    },
    launchTimeout: 60000, // 60 seconds
  });

  global.__MONGOINSTANCE = instance;

  process.env.DATABASE_URL = instance.getUri();
}
