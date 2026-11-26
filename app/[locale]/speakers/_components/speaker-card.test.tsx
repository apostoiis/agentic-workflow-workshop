import { describe, expect, it } from "vitest";

import { render, screen } from "@/tests/utils/render";
import type { Session } from "@/types/session";

import { SpeakerCard } from "./speaker-card";

const keynote: Session = {
  id: "opening-keynote",
  title: "Opening Keynote",
  speaker: "Marta Fernandez",
  track: "React",
  room: "Main Hall",
  startTime: "09:00",
  durationMinutes: 45,
  description: "",
};

const workshop: Session = {
  ...keynote,
  id: "workshop",
  title: "Hands-on Workshop",
  startTime: "14:00",
};

const speaker = { name: "Marta Fernandez", sessions: [keynote, workshop] };

describe("SpeakerCard", () => {
  it("shows the speaker's name as a level 2 heading", () => {
    render(<SpeakerCard speaker={speaker} />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Marta Fernandez" }),
    ).toBeInTheDocument();
  });

  it("marks session titles as English for screen readers", () => {
    render(<SpeakerCard speaker={speaker} />);

    expect(screen.getByText("Opening Keynote")).toHaveAttribute("lang", "en");
  });

  it("links each session, with its start time, to its session page", () => {
    render(<SpeakerCard speaker={speaker} />);

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute("href", "/en/sessions/opening-keynote");
    expect(links[0]).toHaveTextContent(/09:00.*Opening Keynote/);
    expect(links[1]).toHaveAttribute("href", "/en/sessions/workshop");
    expect(links[1]).toHaveTextContent(/14:00.*Hands-on Workshop/);
  });
});
