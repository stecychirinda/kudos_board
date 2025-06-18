import "./CreateCardModal.css";


const CreateCardModal = ({onClose}) => {
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <form>
          <div className="form-group">
            <h1>Create a Card</h1>
            <div className="form-group">
            <label> Title: </label>
            <input type="text" name="title" placeholder="Title" />
            </div>
            <div className="form-group">
            <label> Description: </label>
            <input type="text" name="description" placeholder="Description" />
            </div>
            <div className="form-group">
                <input type="text" name="gifs" placeholder="Search for gifs" />
                <button type="submit">Search</button>
            </div>
            <div>
              <input type='text' name='gif' placeholder='Gif URL' />
            </div>
            <div className="form-group">
            <label> Author: </label>
            <input type="text" name="author" placeholder="Author (optional)" />
            </div>
            </div>
        </form>
        <button type="submit" className="create-board">Create Card</button>
        <button className="close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default CreateCardModal
