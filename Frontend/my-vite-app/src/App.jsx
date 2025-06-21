import "./App.css";
import HomePage from "./Components/HomePage";
import BoardDisplayPage from "./Components/BoardDisplayPage";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

const App = () => {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className={`app-container ${theme}-mode`}>
      <button className="toggle_button" onClick={toggleTheme}>
        Toggle to {theme === "light" ? "Dark" : "Light"} Mode
      </button>
      <Routes>
        <Route path="/" className="home" element={<HomePage />} />
        <Route path="/:id" element={<BoardDisplayPage />} />
      </Routes>
    </div>
  );
};

export default App;
