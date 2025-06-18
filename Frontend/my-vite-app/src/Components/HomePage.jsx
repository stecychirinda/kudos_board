import "./HomePage.css"
import Header from "./Header";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Board from "./Board";

const HomePage = () => {
  return (
    <div className="home-page">
      <Header />
      <div>
      <NavBar />
      </div>
      <Board />
      <Footer />
    </div>
  );
};

export default HomePage;
