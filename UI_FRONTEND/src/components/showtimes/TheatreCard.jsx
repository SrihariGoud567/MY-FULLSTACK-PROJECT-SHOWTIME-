import { useNavigate } from "react-router-dom";
import { useState } from "react";

function TheatreCard({ theatre, timings, movieTitle }) {
  const navigate = useNavigate();
  const [activeShow, setActiveShow] = useState(null);

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 mb-6 border border-yellow-500/20 shadow-lg">

      {/* Theatre Name */}
      <h2 className="text-xl font-bold text-yellow-400 mb-5 tracking-wide">
        {theatre}
      </h2>

      {/* Time Slots */}
      <div className="flex gap-4 flex-wrap">

        {timings.map(show => {
          const isActive = activeShow === show.show_id;

          return (
            <button
              key={show.show_id}
              onClick={() => {
                setActiveShow(show.show_id);
                navigate(`/seats/${show.show_id}`, {
                  state: {
                    movieTitle: movieTitle,
                    theatreName: theatre,
                    showTime: show.time
                  }
                });
              }}
              className={`
                px-6 py-2 rounded-xl font-semibold border transition
                ${isActive
                  ? "bg-yellow-400 text-black border-yellow-400 shadow-md"
                  : "border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"}
              `}
            >
              {new Date(show.time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
              })}
            </button>
          );
        })}

      </div>
    </div>
  );
}

export default TheatreCard;