import './BoardCards.css'
import { useEffect,useState } from 'react';
import { deleteCard, getCardsForBoard, upvoteCards,togglePinStatus} from './fetchingData';

function BoardCards({boardId, cards:initialCards}) {
  const [cards, setCards] = useState(initialCards);
  useEffect(() => {
    const cardsIndex =initialCards.map((card,index)=>({
      ...card,
      originalIndex:index,
    }));
    setCards(cardsIndex)
    },[initialCards]);

     const handleDelete =async (cardId) => {
       await deleteCard(boardId,cardId);
       const updateCards = await getCardsForBoard(boardId);
       setCards(updateCards);
     };


  const handleUpvote = async (cardId)=>{
    const updated = await upvoteCards(cardId);
    if (updated){
      setCards(prev => prev.map(card =>
        card.id === cardId ? {...card, Kudos_count: updated.Kudos_count} : card
      )
      );
    }
  }
  const togglePin = async (e, cardId) => {
    e.preventDefault();
    const updated = await togglePinStatus(cardId);
    if (updated) {
      setCards(prev => prev.map(card =>
        card.id === cardId ? {...card, isPinned: updated.isPinned} : card
      ));
    }
  }
    cards.sort((a, b) => {
      if (a.isPinned === b.isPinned){
        return a.originalIndex - b.originalIndex;
    }
      return b.isPinned - a.isPinned;
    });

  return (
    <div className="BoardCards">
        {cards.map((card)=>{
            return(
           <div className= "BoardCardContainer">
            <div className= "board_card">
              <div className="BoardCard" key={card.id}>
                <img src={card.gif_url ? card.gif_url : "https://media.giphy.com/media/3o7aCSPmaTB1YVZ7R2/giphy.gif"} alt="GIF" />
                <div className="BoardCardText">
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                    <p>{card.author}</p>
                    <button onClick={()=>handleUpvote(card.id)}>UpVote: {card.Kudos_count}</button>
                    <button onClick ={()=>handleDelete(card.id)}>Delete Card</button>
                       <button onClick={(e) => togglePin(e, card.id)}>
                            {card.isPinned ? 'Unpin' : 'Pin'}
                         </button>
                    <button>Comment</button>
                </div>
              </div>
            </div>
            </div>)
        })}
    </div>
  )
}

export default BoardCards;
