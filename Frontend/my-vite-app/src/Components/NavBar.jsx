import { useState } from "react";
import CreateBoardModal from "./CreateBoardModal";

const NavBar = ({ currentCategory, setCurrentCategory }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCategoryClick = (category) => {
    setCurrentCategory(category);
  };

  return (
    <div className="nav-bar">
      <div className="buttons">
        {["All", "Recent", "Celebration", "Thank_You", "Inspiration"].map(
          (category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={currentCategory === category ? "active" : ""}
            >
              {category}
            </button>
          )
        )}
      </div>
      <div className="create-board">
        <button onClick={openModal}>Create Board</button>
        {isModalOpen && <CreateBoardModal onClose={closeModal} />}
      </div>
    </div>
  );
};

export default NavBar;
