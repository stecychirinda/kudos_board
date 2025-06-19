import './BoardCards.css'
import { useEffect,useState } from 'react';
import { deleteCard, getCardsForBoard, upvoteCards} from './fetchingData';

function BoardCards({boardId, cards:initialCards}) {
  const [cards, setCards] = useState(initialCards);

  useEffect(() => {
    setCards(initialCards);
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
