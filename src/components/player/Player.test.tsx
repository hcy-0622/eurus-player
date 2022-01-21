import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Player from "./Player";

describe("Running test for Player", () => {
  test("Check Player", () => {
    render(<Player title="Player" />);
  });
});
