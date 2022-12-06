import { status, Status } from "@/utils/type";

export const colorSet = {
  darkGray: "#888a8c",
  lightGray: "#d2d4d7",
  green: "#79a86b",
  yellow: "#c6b465",
  white: "#ffffff",
  black: "#000000",
};

export const fontColor = (stat: Status, turn?: boolean): string => {
  if (stat !== status.none) {
    return colorSet.white;
  } else if (turn === false) {
    return colorSet.darkGray;
  } else {
    return colorSet.black;
  }
};

export const borderColor = (stat: Status, char: string): string => {
  switch (stat) {
    case status.none:
      return char ? colorSet.darkGray : colorSet.lightGray;

    case status.hit:
      return colorSet.green;

    case status.ball:
      return colorSet.yellow;

    case status.miss:
      return colorSet.darkGray;

    default:
      return colorSet.lightGray;
  }
};

export const blockBGColor = (stat: Status): string => {
  switch (stat) {
    case status.hit:
      return colorSet.green;

    case status.ball:
      return colorSet.yellow;

    case status.miss:
      return colorSet.darkGray;

    default:
      return colorSet.white;
  }
};

export const keyboardBGColor = (stat: Status): string => {
  switch (stat) {
    case status.hit:
      return colorSet.green;

    case status.ball:
      return colorSet.yellow;

    case status.miss:
      return colorSet.darkGray;

    default:
      return colorSet.lightGray;
  }
};
