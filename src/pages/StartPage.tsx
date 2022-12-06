import React, { useState } from "react";
import { useAtom } from "jotai";
import Block from "@/components/Block";
import { websocketAtom } from "@/utils/atom";
import {
  useStartPageMessageHandler,
  useWebsocketConnectionHandler,
} from "@/utils/hook";
import { Message, messageType, status } from "@/utils/type";

const StartPage: React.FC = () => {
  const [websocket] = useAtom(websocketAtom);
  const [button, setButton] = useState(false);

  useWebsocketConnectionHandler();
  useStartPageMessageHandler();

  const onPlayClick: React.MouseEventHandler<HTMLButtonElement> = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
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
