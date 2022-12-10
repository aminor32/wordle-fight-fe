import { atom } from "jotai";
import { v4 as uuid } from "uuid";
import { Result } from "@/utils/type";

export const websocketAtom = atom<WebSocket>(
  new WebSocket(`ws://3.39.227.40/ws/${uuid()}`)
);
export const connectedAtom = atom<boolean>(true);
export const currentWordAtom = atom<string>("");
export const resultsAtom = atom<Result[]>([]);
export const answerAtom = atom<string>("");
export const answerCheckAtom = atom<number[]>([0, 0, 0, 0, 0]);
export const turnAtom = atom<boolean>(false);
export const outcomeAtom = atom<string>("");
