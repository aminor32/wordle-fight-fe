import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import AlphaKey from "@/components/AlphaKey";
import FunctionKey from "@/components/FunctionKey";
import Word from "@/components/Word";
import {
  answerAtom,
  connectedAtom,
  currentWordAtom,
  resultsAtom,
  turnAtom,
  websocketAtom,
} from "@/utils/atom";
import { Message, messageType, Result, status } from "@/utils/type";
import {
  alphabet,
  keyboard_1,
  keyboard_2,
  keyboard_3,
  wordCheck,
} from "@/utils/util";

const PlayPage: React.FC = () => {
  const [websocket] = useAtom(websocketAtom);
  const [connected] = useAtom(connectedAtom);
  const [results, setResults] = useAtom(resultsAtom);
  const [answer] = useAtom(answerAtom);
  const [currentWord, setCurrentWord] = useAtom(currentWordAtom);
  const [turn, setTurn] = useAtom(turnAtom);
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

  useEffect(() => {
    const messageHandler = (event: MessageEvent) => {
      const message: Message = JSON.parse(event.data);

      switch (message.type) {
        case messageType.guess:
          if (message.data) {
            const data: Result = JSON.parse(message.data);

            const result: Result = {
              word: data.word,
              result: wordCheck(data.word, answer),
            };
            const messageToSend: Message = {
              type: messageType.result,
              data: JSON.stringify(result),
            };
            websocket.send(JSON.stringify(messageToSend));

            setResults((prev) => [...prev, data]);
            setKeyboard((prev) => {
              const newKeyboard = { ...prev };
              const word = result.word;

              for (let i = 0; i < 5; i++) {
                if (prev[word[i]] < data.result[i]) {
                  newKeyboard[word[i]] = data.result[i];
                }
              }

              return newKeyboard;
            });

            break;
          } else {
            // TODO: Add alert (is not a word)
            console.error(`${currentWord} is not in word list`);
          }
          break;

        case messageType.result:
          const result: Result = JSON.parse(message.data);

          setCurrentWord("");
          setResults((prev) => [...prev, result]);
          setKeyboard((prev) => {
            const newKeyboard = { ...prev };
            const word = result.word;

            for (let i = 0; i < 5; i++) {
              if (prev[word[i]] < result.result[i]) {
                newKeyboard[word[i]] = result.result[i];
              }
            }

            return newKeyboard;
          });

          break;

        case messageType.turn:
          console.log(message.data);
          setTurn(!!message.data);
      }
    };

    websocket.addEventListener("message", messageHandler);

    return () => {
      websocket.removeEventListener("message", messageHandler);
    };
  }, []);

  useEffect(() => {
    const keyboardEventHandler = (event: KeyboardEvent) => {
      event.preventDefault();

      if (turn) {
        const key = event.key;

        if (alphabet.includes(key) && currentWord.length < 5) {
          setCurrentWord((prev) => prev + key);
        } else if (key === "Enter" && currentWord.length === 5 && connected) {
          const guess: Result = {
            word: currentWord,
            result: wordCheck(currentWord, answer),
          };
          const message: Message = {
            type: messageType.guess,
            data: JSON.stringify(guess),
          };

          websocket.send(JSON.stringify(message));
        } else if (key == "Backspace") {
          setCurrentWord((prev) => prev.slice(0, -1));
        }
      }
    };

    window.addEventListener("keydown", keyboardEventHandler);

    return () => {
      window.removeEventListener("keydown", keyboardEventHandler);
    };
  }, [turn, currentWord, connected]);

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
