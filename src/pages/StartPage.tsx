import React from "react";
import { useAtom } from "jotai";
import Block from "@/components/Block";
import { websocketAtom } from "@/utils/atom";
import { useSetWebsocketEventHandler } from "@/utils/hook";
import { Message, messageType, Result, status } from "@/utils/type";

const StartPage: React.FC = () => {
  const [websocket] = useAtom(websocketAtom);

  useSetWebsocketEventHandler();

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
