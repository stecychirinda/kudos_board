import Header from "./Header";
import Footer from "./Footer";
import BoardCards from "./BoardCards";
import CreateCardModal from "./CreateCardModal";
import { useState } from "react";

const BoardDisplayPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
      const openModal = () => setIsModalOpen(true);
      const closeModal = () => setIsModalOpen(false);

  return (
    <div className="home-page">
      <Header />
      <div className="create-board">
        <button onClick={openModal}>Create New Card</button>
        {isModalOpen && (<CreateCardModal onClose={closeModal} />)}
      </div>
      <BoardCards />
      <Footer />
    </div>
  );
};

export default BoardDisplayPage;
