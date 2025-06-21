import { useState } from "react";
const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

const SearchGIPH = ({ onGifSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm}&limit=10`
    );
    const data = await res.json();
    setResults(data.data);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a GIF"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={(e) => handleSearch(e)}>Search</button>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginTop: "10px",
        }}
      >
        {results.map((result) => (
          <img
            key={result.id}
            src={result.images.original.url}
            alt="gif"
            onClick={() => onGifSelect(result.images.original.url)}
            style={{ cursor: "pointer", borderRadius: "6px", width: "100px" }}
          />
        ))}
      </div>
    </div>
  );
};
export default SearchGIPH;
