import type { Session } from "./session";

/** One speaker and the sessions they give. */
export interface Speaker {
  name: string;
  sessions: Session[];
}
