import {
  MongoDBContainer,
  StartedMongoDBContainer,
} from "@testcontainers/mongodb";
import mongoose from "mongoose";
import { afterAll, beforeAll } from "vitest";

let startedContainer: StartedMongoDBContainer | undefined;

beforeAll(async () => {
  const container = new MongoDBContainer("mongo:8.0.9");
  startedContainer = await container.start();
  await mongoose.connect(startedContainer.getConnectionString(), {
    directConnection: true,
  });
}, Infinity);

afterAll(async () => {
  await mongoose.disconnect();
  if (startedContainer) {
    await startedContainer.stop();
  }
  startedContainer = undefined;
});
