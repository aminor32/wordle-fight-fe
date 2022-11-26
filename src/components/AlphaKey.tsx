import { currentWordAtom } from "@/utils/atom";
import { colorSet } from "@/utils/color";
import { status, Status } from "@/utils/type";
import { useAtom } from "jotai";

interface AlphaKeyProps {
  char: string;
  stat: Status;
}

const AlphaKey: React.FC<AlphaKeyProps> = ({ char, stat }) => {
  const [currentWord, setCurrentWord] = useAtom(currentWordAtom);

  const onKeyClick: React.MouseEventHandler = () => {
    if (currentWord.length < 5) {
      setCurrentWord((prev) => prev + char);
    }
  };

  return (
    <button
      onClick={onKeyClick}
      style={{
        width: "43px",
        height: "58px",
        border: "none",
        borderRadius: "4px",
        background:
          stat == status.hit
            ? colorSet.green
            : stat == status.ball
            ? colorSet.yellow
            : stat == status.miss
            ? colorSet.darkGray
            : colorSet.lightGray,
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontFamily: "Noto Sans",
          fontWeight: "bold",
          color: stat == status.none ? colorSet.black : colorSet.white,
        }}
      >
        {char.toUpperCase()}
      </p>
    </button>
  );
};

export default AlphaKey;