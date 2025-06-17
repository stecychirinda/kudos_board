import "./HomePage.css"
import Header from "./Header";
import NavBar from "./NavBar";
import Footer from "./Footer";
import BoardCards from "./BoardCards";

const HomePage = () => {
  return (
    <div className="home-page">
      <Header />
      <div>
      <NavBar />
      </div>
      <BoardCards />
      <Footer />
    </div>
  );
};

export default HomePage;
