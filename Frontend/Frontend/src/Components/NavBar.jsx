import './NavBar.css'
import SearchBar from './SearchBar'
import {useState} from 'react'
import CreateBoardModal from './CreateBoardModal'

const NavBar = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="nav-bar">
      <SearchBar />
      <div className="buttons">
        <button>All</button>
        <button>Recent</button>
        <button>Celebration</button>
        <button>Thank You</button>
        <button>Inspiration</button>
      </div>
      <div className="create-board">
        <button onClick={openModal}>Create Board</button>
        {isModalOpen && (<CreateBoardModal onClose={closeModal} />)}
      </div>

    </div>
  )
}

export default NavBar
