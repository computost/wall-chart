import { render, screen } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { expect, it } from "vitest";

import { createRouteStub } from "~/test-utils/create-route-stub";

import type { Info } from "./+types/home";

import Home from "./home";

const Stub = createRoutesStub([
  createRouteStub<Info>({
    Component: Home,
    loader() {
      return { message: "This is a test" };
    },
    path: "/",
  }),
]);

it("renders main", async () => {
  render(<Stub />);
  expect(await screen.findByText("This is a test")).toBeInTheDocument();
});
