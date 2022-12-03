import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAtom } from "jotai";
import {
  answerAtom,
  connectedAtom,
  resultsAtom,
  websocketAtom,
} from "@/utils/atom";
import { Message, messageType, Result, status } from "@/utils/type";
import Block from "@/components/Block";

const StartPage: React.FC = () => {
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

  const onPlayClick = (event: React.MouseEvent) => {
    event.preventDefault();

    if (websocket.readyState === websocket.OPEN) {
      const matchMessage: Message = {
        type: messageType.match,
        data: "",
      };

      websocket.send(JSON.stringify(matchMessage));
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button
        onClick={onPlayClick}
        style={{ border: "none", background: "none" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "6px 6px",
          }}
        >
          <Block char="p" stat={status.none} />
          <Block char="l" stat={status.none} />
          <Block char="a" stat={status.none} />
          <Block char="y" stat={status.none} />
        </div>
      </button>
    </div>
  );
};

export default StartPage;
