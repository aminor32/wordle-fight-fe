import Block from "@/components/Block";
import { status } from "@/utils/type";
import { numToStatus } from "@/utils/util";

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
          stat={result ? numToStatus(result[i]) : status.none}
          key={word + i}
        />
      ))}
    </div>
  );
};

export default Word;
