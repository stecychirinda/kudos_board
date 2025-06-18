import './BoardCards.css'
import { useEffect,useState } from 'react';
import { deleteCard} from './fetchingData';

function BoardCards({boardId, cards:initialCards}) {
  const [cards, setCards] = useState(initialCards);

  useEffect(() => {
    setCards(initialCards);
    },[initialCards]);

  const handleDelete=async (cardId)=>{
    await deleteCard(boardId,cardId);
    setCards(cards.filter((card)=>card.id!==cardId));
  }
  return (
    <div className="BoardCards">
        {cards.map((card)=>(
            <div className="BoardCard" key={card.id}>
                <img src={card.gif_url || "https://media.giphy.com/media/3o7aCSPmaTB1YVZ7R2/giphy.gif"} alt="GIF" />
                <div className="BoardCardText">
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                    <p>{card.author}</p>
                    <button>UpVote</button>
                    <button onClick ={()=>handleDelete(card.id)}>Delete Card</button>
                </div>
        </div>
        ))}
    </div>
  )
}

export default BoardCards;
