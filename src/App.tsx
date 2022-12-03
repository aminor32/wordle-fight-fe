import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GamePage from "@/pages/PlayPage";
import StartPage from "@/pages/StartPage";
import { useAtom } from "jotai";
import { connectedAtom } from "@/utils/atom";

const App: React.FC = () => {
  const [connected] = useAtom(connectedAtom);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />

        {connected ? (
          <>
            <Route path="/play" element={<GamePage />} />
          </>
        ) : null}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
