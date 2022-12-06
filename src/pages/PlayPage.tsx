import { useState } from "react";
import { useAtom } from "jotai";
import AlphaKey from "@/components/AlphaKey";
import FunctionKey from "@/components/FunctionKey";
import Word from "@/components/Word";
import { currentWordAtom, resultsAtom } from "@/utils/atom";
import { status } from "@/utils/type";
import { keyboard_1, keyboard_2, keyboard_3 } from "@/utils/util";
import { useKeyboardHandler, usePlayPageMessageHandler } from "@/utils/hook";

const PlayPage: React.FC = () => {
  const [results] = useAtom(resultsAtom);
  const [currentWord] = useAtom(currentWordAtom);
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

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {results.map((result) => (
        <Word word={result.word} result={result.result} key={result.word} />
      ))}

      <Word word={currentWord} />

      {results.length < 5
        ? [...Array(5 - results.length).keys()].map((n) => (
            <Word word="" key={n} />
          ))
        : null}

      <div style={{ display: "flex", gap: "6px 6px", margin: "10px 0 4px 0" }}>
        {keyboard_1.map((char) => (
          <AlphaKey
            char={char}
            stat={
              keyboard[char] === -1
                ? status.none
                : keyboard[char] === 0
                ? status.miss
                : keyboard[char] === 1
                ? status.ball
                : status.hit
            }
            key={char}
          />
        ))}
      </div>

      <div style={{ display: "flex", gap: "6px 6px", margin: "4px 0" }}>
        {keyboard_2.map((char) => (
          <AlphaKey
            char={char}
            stat={
              keyboard[char] === -1
                ? status.none
                : keyboard[char] === 0
                ? status.miss
                : keyboard[char] === 1
                ? status.ball
                : status.hit
            }
            key={char}
          />
        ))}
      </div>

      <div style={{ display: "flex", gap: "6px 6px", margin: "4px 0" }}>
        <FunctionKey func="enter" />
        {keyboard_3.map((char) => (
          <AlphaKey
            char={char}
            stat={
              keyboard[char] === -1
                ? status.none
                : keyboard[char] === 0
                ? status.miss
                : keyboard[char] === 1
                ? status.ball
                : status.hit
            }
            key={char}
          />
        ))}
        <FunctionKey func="del" />
      </div>
    </div>
  );
};

export default PlayPage;
