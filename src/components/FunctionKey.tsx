import { useAtom } from "jotai";
import {
  answerAtom,
  connectedAtom,
  currentWordAtom,
  websocketAtom,
} from "@/utils/atom";
import { colorSet } from "@/utils/color";
import { Message, messageType, Result } from "@/utils/type";
import { wordCheck } from "@/utils/util";

interface FunctionKeyProps {
  func: string;
}

const FunctionKey: React.FC<FunctionKeyProps> = ({ func }) => {
  const [websocket] = useAtom(websocketAtom);
  const [connected] = useAtom(connectedAtom);
  const [answer] = useAtom(answerAtom);
  const [currentWord, setCurrentWord] = useAtom(currentWordAtom);

  const onKeyClick: React.MouseEventHandler = () => {
    switch (func) {
      case "enter":
        if (currentWord.length === 5 && connected) {
          const guess: Result = {
            word: currentWord,
            result: wordCheck(currentWord, answer),
          };
          const message: Message = {
            type: messageType.guess,
            data: JSON.stringify(guess),
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
