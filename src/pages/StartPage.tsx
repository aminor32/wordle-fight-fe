import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import Block from "@/components/Block";
import {
  answerAtom,
  connectedAtom,
  currentWordAtom,
  resultsAtom,
  websocketAtom,
} from "@/utils/atom";
import { useSetWebsocketEventHandler } from "@/utils/hook";
import { Message, messageType, Result, status } from "@/utils/type";
import { wordCheck } from "@/utils/util";
import { useNavigate } from "react-router";

const StartPage: React.FC = () => {
  const [websocket] = useAtom(websocketAtom);
  const [button, setButton] = useState(false);
  const [, setConnected] = useAtom(connectedAtom);
  const [, setResults] = useAtom(resultsAtom);
  const [answer, setAnswer] = useAtom(answerAtom);
  const [currentWord] = useAtom(currentWordAtom);
  const navigate = useNavigate();

  useEffect(() => {
    // set websocket event listener
    websocket.onopen = () => {
      setConnected(true);
    };

    websocket.onclose = () => {
      setConnected(false);
    };
  }, []);

  useEffect(() => {
    const messageHandler = (event: MessageEvent) => {
      const message: Message = JSON.parse(event.data);

      if (message.type == messageType.match && message.data) {
        // set answer word
        setAnswer(message.data);
        navigate("/play");
      }
    };

    websocket.addEventListener("message", messageHandler);

    return () => {
      websocket.removeEventListener("message", messageHandler);
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
      setButton(true);
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
        disabled={button}
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
