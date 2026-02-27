import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar({ city }) {
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState([]);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecent(saved);
  }, []);

  const saveSearch = (value) => {
    let updated = [value, ...recent.filter(i => i !== value)];
    updated = updated.slice(0,5);

    localStorage.setItem("recentSearches", JSON.stringify(updated));
    setRecent(updated);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && query.trim()) {
      saveSearch(query);
      navigate(`/search?movie=${query}&city=${city}`);
      setShow(false);
    }
  };

  return (
    <div className="relative">

      <input
        placeholder="Search movies..."
        value={query}
        onFocus={()=>setShow(true)}
        onBlur={()=>setTimeout(()=>setShow(false),150)}
        onChange={(e)=>setQuery(e.target.value)}
        onKeyDown={handleSearch}
        className="
          w-[300px] md:w-[600px]
          px-6 py-3
          rounded-xl
          border border-yellow-500
          bg-black
          text-yellow-400
          font-semibold
          shadow-[0_0_15px_#eab308]
          focus:ring-2 focus:ring-yellow-400
          outline-none
        "
      />

      {/* RECENT SEARCHES */}
      {show && recent.length > 0 && (
        <div className="absolute w-full bg-black border border-yellow-500/40 mt-2 rounded-xl shadow-lg">

          {recent.map((item,i)=>(
            <div
              key={i}
              onMouseDown={()=>{
                setQuery(item);
                navigate(`/search?movie=${item}&city=${city}`);
              }}
              className="px-5 py-3 text-yellow-400 hover:bg-yellow-500/10 cursor-pointer"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
