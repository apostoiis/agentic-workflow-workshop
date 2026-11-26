import { describe, expect, it } from "vitest";

import type { Session } from "@/types/session";

import { groupSessionsBySpeaker } from "./group-sessions-by-speaker";

function session(id: string, speaker: string, startTime = "09:00"): Session {
  return {
    id,
    title: id,
    speaker,
    track: "React",
    room: "Main Hall",
    startTime,
    durationMinutes: 45,
    description: "",
  };
}

describe("groupSessionsBySpeaker", () => {
  it("sorts speakers by name", () => {
    const speakers = groupSessionsBySpeaker([
      session("a", "Sofia Almeida"),
      session("b", "Diego Castellanos"),
      session("c", "Marta Fernandez"),
    ]);

    expect(speakers.map(({ name }) => name)).toEqual([
      "Diego Castellanos",
      "Marta Fernandez",
      "Sofia Almeida",
    ]);
  });

  it("puts all of a speaker's sessions in one group, by start time", () => {
    const speakers = groupSessionsBySpeaker([
      session("late", "Iker Otxoa", "15:00"),
      session("other", "Naia Etxeberria", "10:00"),
      session("early", "Iker Otxoa", "09:00"),
    ]);

    expect(speakers).toHaveLength(2);
    expect(speakers[0].sessions.map(({ id }) => id)).toEqual(["early", "late"]);
  });

  it("does not list the closing panel's lineup as a speaker", () => {
    const speakers = groupSessionsBySpeaker([
      session("closing-panel", "Full speaker lineup"),
      session("opening-keynote", "Marta Fernandez"),
    ]);

    expect(speakers.map(({ name }) => name)).toEqual(["Marta Fernandez"]);
  });

  it("returns no speakers when there are no sessions", () => {
    expect(groupSessionsBySpeaker([])).toEqual([]);
  });
});
