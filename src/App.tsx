import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAtom } from "jotai";
import GamePage from "@/pages/PlayPage";
import StartPage from "@/pages/StartPage";
import { answerAtom } from "@/utils/atom";

const App: React.FC = () => {
  const [answer] = useAtom(answerAtom);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />

        {answer ? (
          <>
            <Route path="/play" element={<GamePage />} />
          </>
        ) : null}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
