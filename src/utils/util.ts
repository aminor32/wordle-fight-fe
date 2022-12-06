import { status, Status } from "@/utils/type";

export type KeyUnion<T> = keyof T;
export type ValueUnion<T> = T[keyof T];

export const alphabet = "abcdefghijklmnopqrstuvwxyz";

export const keyboard_1 = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
export const keyboard_2 = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
export const keyboard_3 = ["z", "x", "c", "v", "b", "n", "m"];

export const numToStatus = (num: number): Status => {
  switch (num) {
    case 0:
      return status.miss;

    case 1:
      return status.ball;

    case 2:
      return status.hit;

    default:
      return status.none;
  }
};

export const wordCheck = (word: string, answer: string): number[] => {
  let result = [0, 0, 0, 0, 0];
  let tmp: { [key: string]: number } = {};

  for (let i = 0; i < 5; i++) {
    if (tmp[answer[i]]) {
      tmp[answer[i]] += 1;
    } else {
      tmp[answer[i]] = 1;
    }
  }

  for (let i = 0; i < 5; i++) {
    if (word[i] == answer[i]) {
      result[i] = 2;
      tmp[answer[i]] -= 1;
    }
  }

  for (let i = 0; i < 5; i++) {
    if (tmp[word[i]] && result[i] !== 2) {
      result[i] = 1;
      tmp[word[i]] -= 1;
    }
  }

  return result;
};
