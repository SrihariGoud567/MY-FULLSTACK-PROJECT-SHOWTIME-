import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import api from "../../services/api";

function LocationDropdown({ city, setCity }) {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await api.get("shows/cities/");
        setCities(res.data);
      } catch (err) {
        console.error("Failed to load cities:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  return (
    <div className="relative">
      <select
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="
          bg-black
          text-yellow-400
          font-semibold
          pl-3 pr-8 py-1
          rounded-md
          outline-none
          cursor-pointer
          appearance-none
          hover:text-yellow-300
          transition
        "
      >
        <option value="" disabled hidden>
          {loading ? "Loading..." : "City"}
        </option>

        {cities.map((c) => (
          <option key={c.id} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>

      {/* Arrow Icon */}
      <ChevronDown
        size={18}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-yellow-400 pointer-events-none"
      />
    </div>
  );
}

export default LocationDropdown;
