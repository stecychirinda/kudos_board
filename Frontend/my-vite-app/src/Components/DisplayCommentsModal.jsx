import { useState } from "react";
import { getCommentsForCard } from './fetchingData.js';

const DisplayCommentsModal = ({ onClose,cardId,boardId }) => {
  const [comments, setComments] = useState([]);
  console.log(cardId,boardId)



  const getComments = async (e) => {
    e.stopPropagation();
    const comments = await getCommentsForCard(cardId,boardId);
    setComments(comments);
    console.log(comments);
  };



  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" >
        <h2>Comments</h2>
        <button className="close" onClick={getComments}>Get Comments</button>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>
              <p>{comment.text}</p>
              <p>{comment.createdBy}</p>
            </li>
          ))}
        </ul>

        <button className="close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default DisplayCommentsModal;
