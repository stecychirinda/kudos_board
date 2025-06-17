import "./CreateBoardModal.css";


const CreateBoardModal = ({onClose}) => {
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <form>
          <div className="form-group">
            <h1>Create a New Board</h1>
            <div className="form-group">
            <label> Title: </label>
            <input type="text" name="title" placeholder="Title" />
            </div>
            <label> Category: </label>
            <div className="form-group">
            <select className = "category" name="category">
                <option value="">Select a category</option>
                <option value="celebration">Celebration</option>
                <option value="thank_you">Thank You</option>
                <option value="inspiration">inspiration</option>
            </select>
            </div>
            <div className="form-group">
            <label> Author: </label>
            <input type="text" name="author" placeholder="Author" />
            </div>
            </div>
        </form>
        <button type="submit" className="create-board">Create Board</button>
        <button className="close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default CreateBoardModal
