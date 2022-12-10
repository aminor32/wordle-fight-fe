import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import AlphaKey from "@/components/AlphaKey";
import Dialog from "@/components/Dialog";
import FunctionKey from "@/components/FunctionKey";
import Word from "@/components/Word";
import {
  answerAtom,
  answerCheckAtom,
  connectedAtom,
  currentWordAtom,
  outcomeAtom,
  resultsAtom,
} from "@/utils/atom";
import { useKeyboardHandler, usePlayPageMessageHandler } from "@/utils/hook";
import { keyboard_1, keyboard_2, keyboard_3, numToStatus } from "@/utils/util";
import { colorSet } from "@/utils/color";

const PlayPage: React.FC = () => {
  const [connected] = useAtom(connectedAtom);
  const [results] = useAtom(resultsAtom);
  const [answer] = useAtom(answerAtom);
  const [answerCheck] = useAtom(answerCheckAtom);
  const [currentWord] = useAtom(currentWordAtom);
  const [outcome] = useAtom(outcomeAtom);
  const [keyboard, setKeyboard] = useState<{ [key: string]: number }>({
    a: -1,
    b: -1,
    c: -1,
    d: -1,
    e: -1,
    f: -1,
    g: -1,
    h: -1,
    i: -1,
    j: -1,
    k: -1,
    l: -1,
    m: -1,
    n: -1,
    o: -1,
    p: -1,
    q: -1,
    r: -1,
    s: -1,
    t: -1,
    u: -1,
    v: -1,
    w: -1,
    x: -1,
    y: -1,
    z: -1,
  });

  usePlayPageMessageHandler([keyboard, setKeyboard]);
  useKeyboardHandler();

  useEffect(() => {
    if (outcome) {
      const dialog = document.getElementById(
        "outcome-dialog"
      ) as HTMLDialogElement;

      dialog!.showModal();
    }
  }, [outcome]);

  useEffect(() => {
    if (!outcome && !connected) {
      const dialog = document.getElementById(
        "connection-lost-dialog"
      ) as HTMLDialogElement;

      dialog!.showModal();
    }
  }, [connected]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <p
          style={{
            margin: "15px 0px 0px 0px",
            fontFamily: "Noto Sans",
            fontWeight: "normal",
            fontSize: "14px",
          }}
        >
          Opponent's answer is:
        </p>
        <p
          style={{
            margin: "5px 15px 15px 15px",
            fontFamily: "Noto Sans",
            fontWeight: "bold",
            fontSize: "20px",
            letterSpacing: "5px",
          }}
        >
          {answer.split("").map((char, i) => (
            <span
              style={{
                color:
                  answerCheck[i] === 0
                    ? colorSet.black
                    : answerCheck[i] === 1
                    ? colorSet.yellow
                    : colorSet.green,
              }}
            >
              {char.toUpperCase()}
            </span>
          ))}
        </p>

        {results.map((result) => (
          <Word word={result.word} result={result.result} key={result.word} />
        ))}

        <Word word={currentWord} />

        {results.length < 5
          ? [...Array(5 - results.length).keys()].map((n) => (
              <Word word="" key={n} />
            ))
          : null}

        <div
          style={{ display: "flex", gap: "6px 6px", margin: "10px 0 4px 0" }}
        >
          {keyboard_1.map((char) => (
            <AlphaKey
              char={char}
              stat={numToStatus(keyboard[char])}
              key={char}
            />
          ))}
        </div>

        <div style={{ display: "flex", gap: "6px 6px", margin: "4px 0" }}>
          {keyboard_2.map((char) => (
            <AlphaKey
              char={char}
              stat={numToStatus(keyboard[char])}
              key={char}
            />
          ))}
        </div>

        <div style={{ display: "flex", gap: "6px 6px", margin: "4px 0" }}>
          <FunctionKey func="enter" />
          {keyboard_3.map((char) => (
            <AlphaKey
              char={char}
              stat={numToStatus(keyboard[char])}
              key={char}
            />
          ))}
          <FunctionKey func="del" />
        </div>
      </div>

      <Dialog id="outcome-dialog" message={`YOU ${outcome.toUpperCase()}!`} />
      <Dialog id="connection-lost-dialog" message={`Your opponent left game`} />
    </>
  );
};

export default PlayPage;
