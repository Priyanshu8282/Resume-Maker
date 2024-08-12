import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./Component/MainPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/output" element={<MainPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
