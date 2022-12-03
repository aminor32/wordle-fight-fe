import { useEffect } from "react";
import { useAtom } from "jotai";
import AlphaKey from "@/components/AlphaKey";
import FunctionKey from "@/components/FunctionKey";
import Word from "@/components/Word";
import {
  connectedAtom,
  currentWordAtom,
  resultsAtom,
  websocketAtom,
} from "@/utils/atom";
import { Message, messageType, status } from "@/utils/type";
import { alphabet, keyboard_1, keyboard_2, keyboard_3 } from "@/utils/util";

const PlayPage: React.FC = () => {
  const [websocket] = useAtom(websocketAtom);
  const [connected] = useAtom(connectedAtom);
  const [results] = useAtom(resultsAtom);
  const [currentWord, setCurrentWord] = useAtom(currentWordAtom);

  useEffect(() => {
    const keyboardEventHandler = (event: KeyboardEvent) => {
      event.preventDefault();

      const key = event.key;

      if (alphabet.includes(key) && currentWord.length < 5) {
        setCurrentWord((prev) => prev + key);
      } else if (key === "Enter" && currentWord.length === 5 && connected) {
        const message: Message = {
          type: messageType.guess,
          data: currentWord,
        };

        websocket.send(JSON.stringify(message));
      } else if (key == "Backspace") {
        setCurrentWord((prev) => prev.slice(0, -1));
      }
    };

    window.addEventListener("keydown", keyboardEventHandler);

    return () => {
      window.removeEventListener("keydown", keyboardEventHandler);
    };
  }, [currentWord, connected]);

  useEffect(() => {
    console.log(currentWord);
  }, [currentWord]);

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
          <AlphaKey char={char} stat={status.none} key={char} />
        ))}
      </div>

      <div style={{ display: "flex", gap: "6px 6px", margin: "4px 0" }}>
        {keyboard_2.map((char) => (
          <AlphaKey char={char} stat={status.none} key={char} />
        ))}
      </div>

      <div style={{ display: "flex", gap: "6px 6px", margin: "4px 0" }}>
        <FunctionKey func="enter" />
        {keyboard_3.map((char) => (
          <AlphaKey char={char} stat={status.none} key={char} />
        ))}
        <FunctionKey func="del" />
      </div>
    </div>
  );
};

export default PlayPage;
