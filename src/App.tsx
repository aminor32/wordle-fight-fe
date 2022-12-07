import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAtom } from "jotai";
import Layout from "@/components/Layout";
import GamePage from "@/pages/PlayPage";
import StartPage from "@/pages/StartPage";
import { connectedAtom } from "@/utils/atom";

const App: React.FC = () => {
  const [connected] = useAtom(connectedAtom);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<StartPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />

          {connected ? (
            <>
              <Route path="/play" element={<GamePage />} />
            </>
          ) : null}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
