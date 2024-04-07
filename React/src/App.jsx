import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Start from "./Start";
import Profile from "./Profile";
import Create from "./Create";
import Change from "./Update";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/create" element={<Create />} />
        <Route path="/change/:id" element={<Change />} />
      </Routes>
    </Router>
  )
}

export default App;

