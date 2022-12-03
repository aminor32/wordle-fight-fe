import Block from "@/components/Block";
import { status } from "@/utils/type";

interface WordProps {
  word: string;
  result?: number[];
}

const Word: React.FC<WordProps> = ({ word, result }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "5px",
        gap: "6px 6px",
      }}
    >
      {[...Array(5).keys()].map((i) => (
        <Block
          char={word[i] || ""}
          stat={
            result
              ? result[i] === 0
                ? status.miss
                : result[i] === 1
                ? status.ball
                : status.hit
              : status.none
          }
          key={word + i}
        />
      ))}
    </div>
  );
};

export default Word;
