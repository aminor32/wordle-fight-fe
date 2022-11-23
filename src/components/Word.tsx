import Block from "@/components/Block";
import { status } from "@/utils/type";

const Word: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "6px 6px",
      }}
    >
      <Block char="A" stat={status.none} />
      <Block char="D" stat={status.hit} />
      <Block char="I" stat={status.miss} />
      <Block char="E" stat={status.ball} />
      <Block char="U" stat={status.ball} />
    </div>
  );
};

export default Word;
