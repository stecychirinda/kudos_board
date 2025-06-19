import "./CreateCardModal.css";
import SearchGIPH from "./SearchGIPH";
import { useState } from "react";
import {createCard} from "./fetchingData"

const CreateCardModal = ({onClose,boardId}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [gifUrl, setGifUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cardData = {
      title,
      description,
      author: author || "Anonymous",
      gif_url: gifUrl,
  };
  await createCard(boardId,cardData);
  onClose();
}

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-group">
            <h1>Create a Card</h1>
            <div className="form-group">
            <label> Title: </label>
            <input type="text"  placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
            </div>
            <div className="form-group">
            <label> Description: </label>
            <input type="text" name="description" placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)} />
            </div>
            <div className="form-group">
            <label> Author: </label>
            <input type="text" name="author" placeholder="Author (optional)" value={author} onChange={(e)=>setAuthor(e.target.value)} />
            </div>
            <SearchGIPH onGifSelect={setGifUrl} />
            {gifUrl && <img src={gifUrl} alt="Selected Gif" style={{maxWidth: "200px"}} />}
            </div>
        </form>
        <button type="submit" className="create-board" onClick={handleSubmit}>Create Card</button>
        <button className="close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default CreateCardModal
