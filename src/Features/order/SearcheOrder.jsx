import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearcheOrder() {
  const [query, setQuery] = useState("");
  const Navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    Navigate(`order/${query}`);
    setQuery("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        className="bg-yellow-100 text-sm py-2 px-4 w-28 placeholder:text-stone-400 rounded-full sm:w-64 sm:focus:w-72 transition-all focus:outline-none focus:ring focus:ring-yellow-600 focus:ring-opacity-50 duration-300"
        type="text"
        placeholder="Search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}

export default SearcheOrder;
