import { useAtom } from "jotai";
import { currentWordAtom, outcomeAtom, turnAtom } from "@/utils/atom";
import { keyboardBGColor, fontColor } from "@/utils/color";
import { Status } from "@/utils/type";

interface AlphaKeyProps {
  char: string;
  stat: Status;
}

const AlphaKey: React.FC<AlphaKeyProps> = ({ char, stat }) => {
  const [turn] = useAtom(turnAtom);
  const [currentWord, setCurrentWord] = useAtom(currentWordAtom);
  const [outcome] = useAtom(outcomeAtom);

  const onKeyClick: React.MouseEventHandler<HTMLButtonElement> = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    event.currentTarget.blur();

    if (currentWord.length < 5) {
      setCurrentWord((prev) => prev + char);
    }
  };

  return (
    <button
      onClick={onKeyClick}
      disabled={!turn || !!outcome}
      style={{
        width: "43px",
        height: "58px",
        border: "none",
        borderRadius: "4px",
        background: keyboardBGColor(stat),
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontFamily: "Noto Sans",
          fontWeight: "bold",
          color: fontColor(stat, turn),
        }}
      >
        {char.toUpperCase()}
      </p>
    </button>
  );
};

export default AlphaKey;
