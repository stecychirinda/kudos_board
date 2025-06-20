import "./CreateBoardModal.css";
import { createBoard} from "./fetchingData";
import { useState } from "react";

const CreateBoardModal = ({onClose}) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const handleSubmit = async () => {
    const boardData={
      title,
      category,
    };
    await createBoard(boardData);
    onClose();
  };
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <form className="style" onSubmit={handleSubmit} >
          <div className="form-group">
            <h1>Create a New Board</h1>
            <div className="form-group">
            <label> Title: </label>
            <input type="text" name="title" placeholder="Title" value ={title} onChange={(e)=>setTitle(e.target.value)}/>
            </div>
            <div className="form-group">
            <label> Category: </label>
            <select className = "category" name="category" value={category} onChange={(e)=>setCategory(e.target.value)}>
                <option value="">Select a category</option>
                <option value="Celebration">Celebration</option>
                <option value="Thank_You">Thank You</option>
                <option value="Inspiration">Inspiration</option>
            </select>
            </div>
            </div>
            <button type="submit" className="create-board">Create Board</button>
            <button className="close" onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
};

export default CreateBoardModal
