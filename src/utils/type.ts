import { ValueUnion } from "@/utils/util";

export const status = {
  none: "none",
  hit: "hit",
  miss: "miss",
  ball: "ball",
} as const;

export const messageType = {
  match: "match",
  check: "word_check",
  guess: "guess",
  result: "result",
} as const;

export interface Message {
  type: ValueUnion<typeof messageType>;
  data: string;
}

export interface Result {
  word: string;
  result: number[];
}

export type Status = ValueUnion<typeof status>;
