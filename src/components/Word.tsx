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
      <Block char={word[0] || ""} stat={status.none} />
      <Block char={word[1] || ""} stat={status.none} />
      <Block char={word[2] || ""} stat={status.none} />
      <Block char={word[3] || ""} stat={status.none} />
      <Block char={word[4] || ""} stat={status.none} />
    </div>
  );
};

export default Word;
