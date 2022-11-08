import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CreateUsers from "./components/create";
import Dashboard from "./components/dashboard";
import EditUsers from "./components/edit";
import Profile from "./components/profile";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={<CreateUsers />} />
          <Route path="/edit/:id" element={<EditUsers />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
