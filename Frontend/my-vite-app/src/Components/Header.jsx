import "./Header.css";
import * as FaIcons from "react-icons/fa";

const Header = () => {
  return (
    <div className="header">
      <h1>Kudos Board</h1>
      <FaIcons.FaAward className="icon" />
    </div>
  );
};

export default Header;
