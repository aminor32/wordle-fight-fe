import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import {
  answerAtom,
  answerCheckAtom,
  connectedAtom,
  currentWordAtom,
  outcomeAtom,
  resultsAtom,
  turnAtom,
  websocketAtom,
} from "@/utils/atom";
import { Message, messageType, Result } from "@/utils/type";
import { alphabet, wordCheck } from "@/utils/util";

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
  const [, setAnswerCheck] = useAtom(answerCheckAtom);
  const [, setResults] = useAtom(resultsAtom);
  const [currentWord, setCurrentWord] = useAtom(currentWordAtom);
  const [, setOutcome] = useAtom(outcomeAtom);
  const [, setKeyboard] = keyboardState;

  useEffect(() => {
    const messageHandler = (event: MessageEvent) => {
      const message: Message = JSON.parse(event.data);

      switch (message.type) {
        case messageType.guess:
          if (message.data) {
            const data: Result = JSON.parse(message.data);

            const checkResult = wordCheck(data.word, answer);
            const result: Result = {
              word: data.word,
              result: checkResult,
            };
            const messageToSend: Message = {
              type: messageType.result,
              data: JSON.stringify(result),
            };
            websocket.send(JSON.stringify(messageToSend));

            if (
              checkResult.reduce(
                (acc, currentValue) => acc && currentValue === 2,
                true
              )
            ) {
              setOutcome("lose");
              websocket.close();
            }

            setAnswerCheck((prev) => {
              const newAnswerCheck = [...prev];
              const answerArray = answer.split("");

              for (let i = 0; i < 5; i++) {
                if (checkResult[i] === 2) {
                  newAnswerCheck[i] = 2;
                } else {
                  const j = answerArray.findIndex(
                    (char) => char === data.word[i]
                  );

                  if (j !== -1) {
                    newAnswerCheck[j] = Math.max(
                      newAnswerCheck[j],
                      checkResult[i]
                    );
                  }
                }
              }

              return newAnswerCheck;
            });
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

          if (
            result.result.reduce(
              (acc, currentValue) => acc && currentValue === 2,
              true
            )
          ) {
            setOutcome("win");
            websocket.close();
          }
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
  const [, setAnswerCheck] = useAtom(answerCheckAtom);
  const [currentWord, setCurrentWord] = useAtom(currentWordAtom);
  const [outcome] = useAtom(outcomeAtom);

  useEffect(() => {
    const keyboardEventHandler = (event: KeyboardEvent) => {
      event.preventDefault();

      if (turn && !outcome) {
        const key = event.key;

        if (alphabet.includes(key) && currentWord.length < 5) {
          setCurrentWord((prev) => prev + key);
        } else if (key === "Enter" && currentWord.length === 5 && connected) {
          const checkResult = wordCheck(currentWord, answer);
          const guess: Result = {
            word: currentWord,
            result: checkResult,
          };
          const message: Message = {
            type: messageType.guess,
            data: JSON.stringify(guess),
          };

          websocket.send(JSON.stringify(message));

          setAnswerCheck((prev) => {
            const newAnswerCheck = [...prev];
            const answerArray = answer.split("");

            for (let i = 0; i < 5; i++) {
              if (checkResult[i] === 2) {
                newAnswerCheck[i] = 2;
              } else {
                const j = answerArray.findIndex(
                  (char) => char === currentWord[i]
                );

                if (j !== -1) {
                  newAnswerCheck[j] = Math.max(
                    newAnswerCheck[j],
                    checkResult[i]
                  );
                }
              }
            }

            return newAnswerCheck;
          });
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
