import { colorSet } from "@/utils/color";
import { status, Status } from "@/utils/type";

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
        border: `2px solid ${
          stat == status.none && char
            ? colorSet.darkGray
            : stat == status.none
            ? colorSet.lightGray
            : stat == status.hit
            ? colorSet.green
            : stat == status.ball
            ? colorSet.yellow
            : colorSet.darkGray
        }`,
        background:
          stat == status.hit
            ? colorSet.green
            : stat == status.ball
            ? colorSet.yellow
            : stat == status.miss
            ? colorSet.darkGray
            : colorSet.white,
      }}
    >
      <p
        style={{
          margin: 0,
          fontFamily: "Noto Sans",
          fontWeight: "Bold",
          color: stat == status.none ? colorSet.black : colorSet.white,
        }}
      >
        {char.toUpperCase()}
      </p>
    </div>
  );
};

export default Block;
