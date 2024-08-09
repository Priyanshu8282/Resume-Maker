import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentInfo from "./Component/StudentInfo";
import OutputPage from "./Component/OutputPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentInfo/>} />
        <Route path="/output" element={<OutputPage />} />
      </Routes>
    </Router>
  );
}

export default App;
