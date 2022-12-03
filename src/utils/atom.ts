import { atom } from "jotai";
import { Result } from "@/utils/type";

export const websocketAtom = atom<WebSocket>(
  new WebSocket("ws://localhost:8000/ws")
);
export const currentWordAtom = atom<string>("");
export const resultsAtom = atom<Result[]>([]);
export const answerAtom = atom<String>("");
