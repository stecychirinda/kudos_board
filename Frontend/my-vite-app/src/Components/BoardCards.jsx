import './BoardCards.css'

function BoardCards() {
  return (
    <div className="BoardCards">
        <img src='https://picsum.photos/200' alt='random'/>
        <div className="BoardCards__text">
            <h2>Board Cards</h2>
            <p>Some text</p>
            <button>UpVote</button>
            <button>Delete Card</button>
        </div>
    </div>
  )
}

export default BoardCards;
