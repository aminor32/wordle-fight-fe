import { atom } from "jotai";
import { v4 as uuid } from "uuid";
import { Result } from "@/utils/type";

export const websocketAtom = atom<WebSocket>(
  new WebSocket(`ws://3.39.227.40/ws/${uuid()}`)
);
export const currentWordAtom = atom<string>("");
export const resultsAtom = atom<Result[]>([]);
export const answerAtom = atom<String>("");
