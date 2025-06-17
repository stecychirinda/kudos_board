import { useState } from "react";
import "./SearchBar.css";

function SearchBar({ onMovieTitle, onClear }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onMovieTitle(input.trim());
    }
  };

  const handleClear = () => {
    setInput("");
    onClear();
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        className="search-input"
        type="text"
        placeholder="Search boards..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="search-button" type="submit">
        {" "}
        Search
      </button>
      <button className="clear-button" type="button" onClick={handleClear}>
        {" "}
        Clear
      </button>
    </form>
  );
}

export default SearchBar;
