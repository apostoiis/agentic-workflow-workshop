import type { Session } from "@/types/session";
import type { Speaker } from "@/types/speaker";

/** The closing panel's `speaker` value. It stands for everyone, not a person. */
const NOT_A_SPEAKER = "Full speaker lineup";

/**
 * Groups sessions by speaker. Speakers are sorted by name and each speaker's
 * sessions by start time.
 */
export function groupSessionsBySpeaker(sessions: Session[]): Speaker[] {
  const sessionsByName = new Map<string, Session[]>();

  for (const session of sessions) {
    if (session.speaker === NOT_A_SPEAKER) continue;

    const group = sessionsByName.get(session.speaker);
    if (group) {
      group.push(session);
    } else {
      sessionsByName.set(session.speaker, [session]);
    }
  }

  return Array.from(sessionsByName, ([name, group]) => ({
    name,
    sessions: group.sort((a, b) => a.startTime.localeCompare(b.startTime)),
  })).sort((a, b) => a.name.localeCompare(b.name));
}
