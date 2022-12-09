import { useAtom } from "jotai";
import {
  answerAtom,
  answerCheckAtom,
  connectedAtom,
  currentWordAtom,
  turnAtom,
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
  const [turn] = useAtom(turnAtom);
  const [answer] = useAtom(answerAtom);
  const [, setAnswerCheck] = useAtom(answerCheckAtom);
  const [currentWord, setCurrentWord] = useAtom(currentWordAtom);

  const onKeyClick: React.MouseEventHandler<HTMLButtonElement> = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    event.currentTarget.blur();

    switch (func) {
      case "enter":
        if (currentWord.length === 5 && connected) {
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
      disabled={!turn}
      style={{
        width: "65px",
        height: "58px",
        border: "none",
        borderRadius: "4px",
        background: colorSet.lightGray,
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontFamily: "Noto Sans",
          fontWeight: "bold",
          color: turn ? colorSet.black : colorSet.darkGray,
        }}
      >
        {func.toUpperCase()}
      </p>
    </button>
  );
};

export default FunctionKey;
