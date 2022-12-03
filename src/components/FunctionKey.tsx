import { useAtom } from "jotai";
import { connectedAtom, currentWordAtom, websocketAtom } from "@/utils/atom";
import { colorSet } from "@/utils/color";
import { Message, messageType } from "@/utils/type";

interface FunctionKeyProps {
  func: string;
}

const FunctionKey: React.FC<FunctionKeyProps> = ({ func }) => {
  const [websocket] = useAtom(websocketAtom);
  const [connected] = useAtom(connectedAtom);
  const [currentWord, setCurrentWord] = useAtom(currentWordAtom);

  const onKeyClick: React.MouseEventHandler = () => {
    switch (func) {
      case "enter":
        if (currentWord.length === 5 && connected) {
          const message: Message = {
            type: messageType.guess,
            data: currentWord,
          };

          websocket.send(JSON.stringify(message));
        }

        break;

      case "del":
        setCurrentWord((prev) => prev.slice(0, -1));
        break;

      default:
        break;
    }
  };

  return (
    <button
      onClick={onKeyClick}
      style={{
        width: "65px",
        height: "58px",
        border: "none",
        borderRadius: "4px",
        background: colorSet.lightGray,
        textAlign: "center",
      }}
    >
      <p style={{ fontFamily: "Noto Sans", fontWeight: "bold" }}>
        {func.toUpperCase()}
      </p>
    </button>
  );
};

export default FunctionKey;
