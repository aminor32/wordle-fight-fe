import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAtom } from "jotai";
import Block from "@/components/Block";
import {
  answerAtom,
  connectedAtom,
  turnAtom,
  websocketAtom,
} from "@/utils/atom";
import { Message, messageType, status } from "@/utils/type";

const StartPage: React.FC = () => {
  const [websocket] = useAtom(websocketAtom);
  const [, setTurn] = useAtom(turnAtom);
  const [button, setButton] = useState(false);
  const [, setConnected] = useAtom(connectedAtom);
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
  }, []);

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
