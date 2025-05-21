import {
  MongoDBContainer,
  StartedMongoDBContainer,
} from "@testcontainers/mongodb";
import mongoose, { Mongoose } from "mongoose";
import { test as baseTest } from "vitest";

export const test = baseTest.extend<{
  mongoDbContainer: StartedMongoDBContainer;
  mongoDbVersion: string;
  mongoose: Mongoose;
}>({
  mongoDbContainer: async ({ mongoDbVersion }, use) => {
    const container = new MongoDBContainer(mongoDbVersion).withReuse();
    const startedContainer = await container.start();
    await use(startedContainer);
    await startedContainer.stop();
  },
  mongoDbVersion: "mongo:6.0.1",
  mongoose: async ({ mongoDbContainer }, use) => {
    const connectedMongoose = await mongoose.connect(
      mongoDbContainer.getConnectionString(),
    );
    await use(connectedMongoose);
    await connectedMongoose.disconnect();
  },
});
export const it = test;
