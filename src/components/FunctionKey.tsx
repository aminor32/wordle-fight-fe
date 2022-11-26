import { currentWordAtom } from "@/utils/atom";
import { colorSet } from "@/utils/color";
import { useAtom } from "jotai";

interface FunctionKeyProps {
  func: string;
}

const FunctionKey: React.FC<FunctionKeyProps> = ({ func }) => {
  const [, setCurrentWord] = useAtom(currentWordAtom);

  const onKeyClick: React.MouseEventHandler = async () => {
    switch (func) {
      case "enter":
        // 1. 단어인지 검사
        // 2. 단어라면 웹소켓으로 요청 보내기
        // 3. 단어가 아니라면 다시 입력하도록 할 것 (비우지는 않음)
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
