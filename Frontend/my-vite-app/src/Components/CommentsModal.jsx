import "./Comments.css";
import { createComment,getCommentsForCard} from "./fetchingData";
import { useState } from "react";

const CommentsModal = ({ onClose,cardId,boardId,card}) => {
      const [message, setMessage] = useState("");
      const [author, setAuthor] = useState("");

      const handleSubmit = async (e) => {
        e.preventDefault();
        const commentData={
          message,
          author: author || "Anonymous",
        };
        await createComment(boardId,cardId,commentData);
      };
        const [comments, setComments] = useState([]);
        const getComments = async (e) => {
          e.stopPropagation();
          const comments = await getCommentsForCard(boardId,cardId);
          setComments(comments);
          console.log(comments);
        };
        console.log(card)


  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
        <h1>Comments for {card.title}</h1>
        <p>{card.author}</p>
        <p>{card.description}</p>
        <img src={card.gif_url} alt="GIF" />
        <h2>Comments</h2>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>
              <p>{comment.message}</p>
              <p>{comment.author}</p>
            </li>
          ))}
        </ul>
        <input type="text" placeholder="Enter your comment here (required)" value={message} onChange={(e) => setMessage(e.target.value)} />
        <input type="text" placeholder="Enter your author here (optional)" value={author} onChange={(e) => setAuthor(e.target.value)} />
        <button type="submit" >Add Comments</button>
        <button type="submit" onClick={getComments}> DisplayComments</button>
        </form>
        <button className="close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CommentsModal;
