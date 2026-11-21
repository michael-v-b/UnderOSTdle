import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import DailyGame from "./DailyGame.jsx";
import EndlessGame from "./EndlessGame.jsx";
import "./App.css";

function App() {
  return (
    <BrowserRouter basename="/deltatune">
      <Routes>
        <Route path="daily" element={<DailyGame />} />
        <Route path="endless" element={<EndlessGame />} />
        <Route path="*" element={<Navigate to="daily" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
