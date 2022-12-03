import { useAtom } from "jotai";
import { useEffect } from "react";
import GamePage from "@/pages/GamePage";
import { resultsAtom, websocketAtom } from "@/utils/atom";
import { Message, messageType, Result } from "@/utils/type";

const App: React.FC = () => {
  const [websocket] = useAtom(websocketAtom);
  const [, setResults] = useAtom(resultsAtom);

  useEffect(() => {
    // set websocket event listener
    websocket.onmessage = (event) => {
      const message: Message = JSON.parse(event.data);

      switch (message.type) {
        case messageType.match:
          // set answer word
          console.log(message.data);
          break;

        case messageType.guess:
          // TODO: Add alert (is not a word)
          break;

        case messageType.result:
          const result: Result = JSON.parse(message.data);
          setResults((prev) => [...prev, result]);

          break;
      }
    };
  }, []);

  return (
    <>
      <GamePage />
    </>
  );
};

export default App;
