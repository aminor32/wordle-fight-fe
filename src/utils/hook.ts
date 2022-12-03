import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAtom } from "jotai";
import {
  answerAtom,
  connectedAtom,
  resultsAtom,
  websocketAtom,
} from "@/utils/atom";
import { Message, messageType, Result } from "@/utils/type";

export const useSetWebsocketEventHandler = () => {
  const [websocket] = useAtom(websocketAtom);
  const [, setConnected] = useAtom(connectedAtom);
  const [, setResults] = useAtom(resultsAtom);
  const [, setAnswer] = useAtom(answerAtom);
  const navigate = useNavigate();

  useEffect(() => {
    // set websocket event listener
    websocket.onopen = () => {
      setConnected(true);
    };

    websocket.onclose = () => {
      setConnected(false);
    };

    websocket.onmessage = (event) => {
      const message: Message = JSON.parse(event.data);

      switch (message.type) {
        case messageType.match:
          if (message.data) {
            // set answer word
            console.log(message.data);
            setAnswer(message.data);
            navigate("/play");
          }

          break;

        case messageType.guess:
          // TODO: Add alert (is not a word)
          break;

        case messageType.result:
          const result: Result = JSON.parse(message.data);
          setResults((prev) => [...prev, result]);

          break;
      }
    };
  }, []);
};
