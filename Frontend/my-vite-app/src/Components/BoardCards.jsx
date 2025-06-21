import "./BoardCards.css";
import { useEffect, useState } from "react";
import {
  deleteCard,
  getCardsForBoard,
  upvoteCards,
  togglePinStatus,
} from "./fetchingData";
import CommentsModal from "./CommentsModal";
import { ImBin } from "react-icons/im";
import { FaComments } from "react-icons/fa";
import { BiSolidUpvote } from "react-icons/bi";

function BoardCards({ boardId, cards: initialCards }) {
  const [selectedCardId, setSelectedCardId] = useState(null);
  const openModal = (cardId) => setSelectedCardId(cardId);
  const closeModal = () => setSelectedCardId(null);
  const [cards, setCards] = useState(initialCards);

  useEffect(() => {
    const cardsIndex = initialCards.map((card, index) => ({
      ...card,
      originalIndex: index,
    }));
    setCards(cardsIndex);
  }, [initialCards]);

  const handleDelete = async (cardId) => {
    await deleteCard(boardId, cardId);
    const updateCards = await getCardsForBoard(boardId);
    setCards(updateCards);
  };

  const handleUpvote = async (cardId) => {
    const updated = await upvoteCards(cardId);
    if (updated) {
      setCards((prev) =>
        prev.map((card) =>
          card.id === cardId
            ? { ...card, Kudos_count: updated.Kudos_count }
            : card
        )
      );
    }
  };
  const togglePin = async (cardId) => {
    const updated = await togglePinStatus(cardId);
    if (updated) {
      setCards((prev) =>
        prev.map((card) =>
          card.id === cardId ? { ...card, isPinned: updated.isPinned } : card
        )
      );
    }
  };
  cards.sort((a, b) => {
    if (a.isPinned === b.isPinned) {
      return a.originalIndex - b.originalIndex;
    }
    return b.isPinned - a.isPinned;
  });

  return (
    <div className="BoardCards">
      <div className="card-grid-container">
        {cards.map((card) => {
          return (
            <div className="BoardCardContainer">
              <div className="BoardCard" key={card.id}>
                <img
                  src={
                    card.gif_url
                      ? card.gif_url
                      : "https://media.giphy.com/media/3o7aCSPmaTB1YVZ7R2/giphy.gif"
                  }
                  alt="GIF"
                />
                <div className="BoardCardText">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <p>{card.author}</p>
                  <div className="button-row">
                    <button onClick={() => handleUpvote(card.id)}>
                      <BiSolidUpvote /> {card.Kudos_count}
                    </button>
                    <button onClick={() => handleDelete(card.id)}>
                      <ImBin />
                    </button>
                    <button onClick={() => togglePin(card.id)}>
                      {card.isPinned ? "Unpin" : "Pin"}
                    </button>
                  </div>
                  <div>
                    <button onClick={() => openModal(card.id)}>
                      <FaComments />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {selectedCardId && (
        <CommentsModal
          onClose={closeModal}
          cardId={selectedCardId}
          boardId={boardId.id}
          card={cards.find((card) => card.id === selectedCardId)}
        />
      )}
    </div>
  );
}

export default BoardCards;
