import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import {
  answerAtom,
  connectedAtom,
  currentWordAtom,
  resultsAtom,
  turnAtom,
  websocketAtom,
} from "@/utils/atom";
import { Message, messageType, Result } from "@/utils/type";
import { alphabet, wordCheck } from "@/utils/util";
import { useNavigate } from "react-router";

export const useWebsocketConnectionHandler = () => {
  const [websocket] = useAtom(websocketAtom);
  const [, setConnected] = useAtom(connectedAtom);

  useEffect(() => {
    // set websocket event listener
    websocket.onopen = () => {
      setConnected(true);
    };

    websocket.onclose = () => {
      setConnected(false);
    };
  }, []);
};

export const useStartPageMessageHandler = () => {
  const [websocket] = useAtom(websocketAtom);
  const [, setTurn] = useAtom(turnAtom);
  const [, setAnswer] = useAtom(answerAtom);
  const navigate = useNavigate();

  useEffect(() => {
    const messageHandler = (event: MessageEvent) => {
      const message: Message = JSON.parse(event.data);

      switch (message.type) {
        case messageType.match:
          if (message.data) {
            // set answer word
            setAnswer(message.data);
            navigate("/play");
          }

          break;

        case messageType.turn:
          console.log(message.data);
          setTurn(!!message.data);

          break;
      }
    };

    websocket.addEventListener("message", messageHandler);

    return () => {
      websocket.removeEventListener("message", messageHandler);
    };
  }, []);
};

export const usePlayPageMessageHandler = (
  keyboardState: [
    { [key: string]: number },
    React.Dispatch<React.SetStateAction<{ [key: string]: number }>>
  ]
) => {
  const [websocket] = useAtom(websocketAtom);
  const [, setTurn] = useAtom(turnAtom);
  const [answer] = useAtom(answerAtom);
  const [, setResults] = useAtom(resultsAtom);
  const [currentWord, setCurrentWord] = useAtom(currentWordAtom);
  const [, setKeyboard] = keyboardState;

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
};

export const useKeyboardHandler = () => {
  const [websocket] = useAtom(websocketAtom);
  const [connected] = useAtom(connectedAtom);
  const [turn] = useAtom(turnAtom);
  const [answer] = useAtom(answerAtom);
  const [currentWord, setCurrentWord] = useAtom(currentWordAtom);

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
};
