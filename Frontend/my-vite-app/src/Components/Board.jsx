import { useState,useEffect } from 'react';
import './Board.css'
import { getAllBoards,deleteBoard } from './fetchingData';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

function Board({currentCategory}) {
const [pinnedBoards, setPinnedBoards] = useState(new Set());

const togglePin = (e, boardId) => {
  e.preventDefault();
  setPinnedBoards(prev => {
    const newPinnedBoards = new Set(prev);
    if (newPinnedBoards.has(boardId)) {
      newPinnedBoards.delete(boardId);
    } else {
      newPinnedBoards.add(boardId);
    }
    return newPinnedBoards;
  });
};
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
  filteredBoards.sort((a, b) => {
    const aPinned = pinnedBoards.has(a.id);
    const bPinned = pinnedBoards.has(b.id);
    return (aPinned===bPinned)?0: aPinned?-1:1;
  });

  return (
    <div className="boards_display">
    <div className="search_bar">
    <SearchBar onSearch={handleSearch} onClear={handleClear} />
    </div>
    <div className="board_cards_container">
      {""}
    {filteredBoards.map(board => (
      <div key={board.id} className={`Board ${pinnedBoards.has(board.id) ? 'pinned' : ''}`}>
      <img src='https://picsum.photos/200' alt='random'/>
      <div className="Board__text">
          <h2>{board.title}</h2>
          <p>{board.category}</p>
          <Link to = {`/${board.id}`}>
          <button>View Board</button>
          </Link>
          <button onClick={()=>handleDelete(board.id)}>Delete Board</button>
      </div>
      <button onClick={(e) => togglePin(e, board.id)}>
            {pinnedBoards.has(board.id) ? 'Unpin' : 'Pin'}
          </button>
    </div>
    ))}
    </div>
</div>
)
}

export default Board;
