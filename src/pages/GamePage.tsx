import { useEffect } from "react";
import { useAtom } from "jotai";
import AlphaKey from "@/components/AlphaKey";
import FunctionKey from "@/components/FunctionKey";
import Word from "@/components/Word";
import { currentWordAtom, resultsAtom, websocketAtom } from "@/utils/atom";
import { Message, messageType, status } from "@/utils/type";

const GamePage: React.FC = () => {
  const [websocket] = useAtom(websocketAtom);
  const [results] = useAtom(resultsAtom);
  const [currentWord] = useAtom(currentWordAtom);

  useEffect(() => {
    if (websocket.readyState === websocket.OPEN) {
      const matchMessage: Message = {
        type: messageType.match,
        data: "",
      };

      websocket.send(JSON.stringify(matchMessage));
    }
  }, [websocket.readyState]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {results.map((result) => (
        <Word word={result.word} result={result.result} key={result.word} />
      ))}

      <Word word={currentWord} />

      {results.length < 5
        ? [...Array(5 - results.length).keys()].map((n) => (
            <Word word="" key={n} />
          ))
        : null}

      <div style={{ display: "flex", gap: "6px 6px", margin: "10px 0 4px 0" }}>
        <AlphaKey char="q" stat={status.none} />
        <AlphaKey char="w" stat={status.none} />
        <AlphaKey char="e" stat={status.none} />
        <AlphaKey char="r" stat={status.none} />
        <AlphaKey char="t" stat={status.none} />
        <AlphaKey char="y" stat={status.none} />
        <AlphaKey char="u" stat={status.none} />
        <AlphaKey char="i" stat={status.none} />
        <AlphaKey char="o" stat={status.none} />
        <AlphaKey char="p" stat={status.none} />
      </div>

      <div style={{ display: "flex", gap: "6px 6px", margin: "4px 0" }}>
        <AlphaKey char="a" stat={status.none} />
        <AlphaKey char="s" stat={status.none} />
        <AlphaKey char="d" stat={status.none} />
        <AlphaKey char="f" stat={status.none} />
        <AlphaKey char="g" stat={status.none} />
        <AlphaKey char="h" stat={status.none} />
        <AlphaKey char="j" stat={status.none} />
        <AlphaKey char="k" stat={status.none} />
        <AlphaKey char="l" stat={status.none} />
      </div>

      <div style={{ display: "flex", gap: "6px 6px", margin: "4px 0" }}>
        <FunctionKey func="enter" />
        <AlphaKey char="z" stat={status.none} />
        <AlphaKey char="x" stat={status.none} />
        <AlphaKey char="c" stat={status.none} />
        <AlphaKey char="v" stat={status.none} />
        <AlphaKey char="b" stat={status.none} />
        <AlphaKey char="n" stat={status.none} />
        <AlphaKey char="m" stat={status.none} />
        <FunctionKey func="del" />
      </div>
    </div>
  );
};

export default GamePage;
