import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GamePage from "@/pages/PlayPage";
import StartPage from "@/pages/StartPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/play" element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
