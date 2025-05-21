import { describe } from "node:test";
import { expect, it } from "vitest";

import { loader } from "./home";

describe("loader", () => {
  it("should load a message from config", () => {
    const response = loader({
      context: { VALUE_FROM_EXPRESS: "This is a test" },
      params: {},
      request: new Request("https://app.com/home"),
    });
    expect(response.message).toBe("This is a test");
  });
});
