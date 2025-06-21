import Header from "./Header";
import Footer from "./Footer";
import BoardCards from "./BoardCards";
import CreateCardModal from "./CreateCardModal";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCardsForBoard } from "./fetchingData";

const BoardDisplayPage = () => {
  const { id } = useParams();
  const [cards, setCards] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const fetchCards = async () => {
      const fetchedCards = await getCardsForBoard(id);
      setCards(fetchedCards);
    };
    fetchCards();
  }, [id]);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="home-page">
      <Header />
      <div className="create-board">
        <button onClick={openModal}>Create New Card</button>
        {isModalOpen && <CreateCardModal onClose={closeModal} boardId={id} />}
      </div>
      <BoardCards boardId={id} cards={cards} />
      <Footer />
    </div>
  );
};

export default BoardDisplayPage;
