import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import SessionPlayers from "./pages/SessionPlayers";
import Stats from "./pages/Stats";
import Winners from "./pages/Winners";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/session-players" element={<SessionPlayers />} />
        <Route path="/winners" element={<Winners />} />
      </Routes>
    </div>
  );
}

export default App;
