import "./HomePage.css"
import Header from "./Header";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Board from "./Board";
import { useState } from "react";

const HomePage = () => {
  const [currentCategory, setCurrentCategory] = useState("All");

  return (
    <div className="home-page">
      <Header />
      <div>
      <NavBar
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
      />
      </div>
      <Board currentCategory={currentCategory} />
      <Footer />
    </div>
  );
};

export default HomePage;
