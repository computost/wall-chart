import { render, screen } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { expect, it } from "vitest";

import Home, { meta } from "./home";

const Stub = createRoutesStub([{ Component: Home, meta, path: "/" }]);

it("renders main", async () => {
  render(<Stub />);
  expect(await screen.findByRole("main")).toBeInTheDocument();
});
