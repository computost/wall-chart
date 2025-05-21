import { Schema } from "mongoose";
import mongoose from "mongoose";
import { describe } from "node:test";
import { expect, it } from "vitest";

import { loader } from "./home";

describe("loader", () => {
  it("should connect to a database", { timeout: Infinity }, async () => {
    const workerSchema = new Schema({ name: String });
    const Worker = mongoose.model("Worker", workerSchema);
    const testWorker = new Worker({ name: "Joe" });
    await testWorker.save();
    expect(await Worker.countDocuments()).toBe(1);
  });

  it("should load a message from config", async () => {
    const response = loader({
      context: { VALUE_FROM_EXPRESS: "This is a test" },
      params: {},
      request: new Request("https://app.com/home"),
    });
    expect(response.message).toBe("This is a test");
  });
});
