import { useState,useEffect } from 'react';
import './Board.css'
import { getAllBoards,deleteBoard } from './fetchingData';
import { Link } from 'react-router-dom';

function Board({currentCategory}) {
const [boards, setBoards] = useState([]);
  useEffect(() => {
    const fetchBoards = async () => {
      const boardsData = await getAllBoards();
      setBoards(boardsData);
    };
    fetchBoards();
  }, []);

  const handleDelete =async (id) => {
    await deleteBoard(id);
    const updatedBoards = await getAllBoards();
    setBoards(updatedBoards);
  };

  let filteredBoards = [];
  if (currentCategory === 'All') {
    filteredBoards = boards;
  }else if(currentCategory === "Recent"){
    filteredBoards = boards.slice(-6);
  } else {
    filteredBoards= boards.filter(
      (board) => board.category === currentCategory
    )
  }

  return (
    <div className="boards_display">
    {filteredBoards.map(board => (
      <div key={board.id} className="Board">
      <img src='https://picsum.photos/200' alt='random'/>
      <div className="Board__text">
          <h2>{board.title}</h2>
          <p>{board.category}</p>
          <Link to = {`/${board.id}`}>
          <button>View Board</button>
          </Link>
          <button onClick={()=>handleDelete(board.id)}>Delete Board</button>
      </div>
  </div>
    ))}
</div>
)
}

export default Board;
