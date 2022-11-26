import { atom } from "jotai";

export const currentWordAtom = atom("");
export const wordsAtom = atom<string[]>([]);
