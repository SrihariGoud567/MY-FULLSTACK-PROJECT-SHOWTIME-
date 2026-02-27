import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, MapPin, Clapperboard } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import SearchBar from "../UI/SearchBar";
import LocationDropdown from "../UI/LocationDropdown";
import Sidebar from "./Sidebar";

function Navbar() {
  const { user, setUser, logout } = useAuth();
  const [menu, setMenu] = useState(false);
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setUser(null);
    navigate("/");
  };

  /* ESC close */
  useEffect(() => {
    const close = (e) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <nav className="bg-black border-b border-yellow-500/40 py-5 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 gap-10">
        {/* LEFT */}
        <div className="flex items-center gap-12">

          <Link
            to="/"
            className="group flex items-center gap-3 px-5 py-2.5 rounded-xl
  bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500
  text-black font-bold tracking-wide
  shadow-lg shadow-yellow-500/20
  hover:shadow-yellow-400/60 hover:scale-105
  transition-all duration-300 ease-out
  border border-yellow-300/40 backdrop-blur-md"
          >
            <Clapperboard
              size={26}
              className="group-hover:rotate-12 transition-transform duration-300"
            />

            <span className="text-lg">It's Showtime</span>
          </Link>
          <SearchBar city={city} />
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-10">

          {/* CITY */}
          <div className="flex items-center gap-2 border border-yellow-500 px-5 py-2 rounded-xl text-yellow-400 font-bold hover:bg-yellow-500/10 transition">
            <MapPin size={20} />
            <LocationDropdown city={city} setCity={setCity} />
          </div>

          {/* AUTH */}
          {!user ? (
            <button
              onClick={() => navigate("/login")}
              className="border border-yellow-500 px-5 py-2 rounded-xl text-yellow-400 font-bold hover:bg-yellow-500 hover:text-black transition"
            >
              Sign In
            </button>
          ) : (
            <span className="text-yellow-400 font-bold text-xl">
              {user.name}
            </span>
          )}

          {/* MENU BUTTON */}
          <button
            onClick={() => setMenu(true)}
            className="text-yellow-400 hover:scale-125 transition"
          >
            <Menu size={32} />
          </button>
        </div>
      </div>

      {/* SLIDE SIDEBAR */}
      <Sidebar
        open={menu}
        setOpen={setMenu}
        user={user}
        handleLogout={handleLogout}
      />
    </nav>
  );
}

export default Navbar;
