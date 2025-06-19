import { useState,useEffect } from 'react';
import './Board.css'
import { getAllBoards,deleteBoard } from './fetchingData';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

function Board({currentCategory}) {
const [boards, setBoards] = useState([]);
const [searchBoards, setSearchBoards] = useState([]);

  useEffect(() => {
    const fetchBoards = async () => {
      const boardsData = await getAllBoards();
      setBoards(boardsData);
      setSearchBoards(boardsData);
    };
    fetchBoards();
  }, []);

  const handleDelete =async (id) => {
    await deleteBoard(id);
    const updatedBoards = await getAllBoards();
    setBoards(updatedBoards);
    setSearchBoards(updatedBoards);
  };

  const handleSearch = (searchTerm) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    const results = boards.filter(board =>
      board.title.toLowerCase().includes(lowerSearchTerm)
    );
    setSearchBoards(results);
  };

  const handleClear=() => {
    setSearchBoards(boards);
  };

  let filteredBoards = [];
  if (currentCategory === 'All') {
    filteredBoards = searchBoards;
  }else if(currentCategory === "Recent"){
    filteredBoards = searchBoards.slice(-6);
  } else {
    filteredBoards= searchBoards.filter(
      (board) => board.category === currentCategory
    )
  }

  return (
    <div className="boards_display">
    <div className="search_bar">
    <SearchBar onSearch={handleSearch} onClear={handleClear} />
    </div>
    <div className="board_cards_container" >
      {""}
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
</div>
)
}

export default Board;
