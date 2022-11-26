import { ValueUnion } from "utils/util";

export const status = {
  none: "none",
  hit: "hit",
  miss: "miss",
  ball: "ball",
} as const;

export type Status = ValueUnion<typeof status>;
