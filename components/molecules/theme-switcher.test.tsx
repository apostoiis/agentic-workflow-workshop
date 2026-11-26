import { describe, expect, it } from "vitest";

import { render, screen } from "@/tests/utils/render";

import { ThemeSwitcher } from "./theme-switcher";

describe("ThemeSwitcher", () => {
  it("gives the icon-only button an accessible name", () => {
    render(<ThemeSwitcher />);

    expect(
      screen.getByRole("button", { name: "Change theme" }),
    ).toBeInTheDocument();
  });
});
