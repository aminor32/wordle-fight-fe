import { blockBGColor, borderColor, fontColor } from "@/utils/color";
import { Status } from "@/utils/type";

interface BlockProps {
  char: string;
  stat: Status;
}

const Block: React.FC<BlockProps> = ({ char, stat }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "48px",
        height: "48px",
        border: `2px solid ${borderColor(stat, char)}`,
        background: blockBGColor(stat),
      }}
    >
      <p
        style={{
          margin: 0,
          fontFamily: "Noto Sans",
          fontWeight: "Bold",
          color: fontColor(stat),
        }}
      >
        {char.toUpperCase()}
      </p>
    </div>
  );
};

export default Block;
