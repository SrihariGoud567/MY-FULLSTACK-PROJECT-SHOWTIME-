import { useParams, useLocation, useNavigate } from "react-router-dom";
import SeatGrid from "../components/seats/SeatGrid";

function SeatSelection() {

  const { showId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  /* DATA FROM NAVIGATION STATE */
  const movieTitle = location.state?.movieTitle;
  const theatreName = location.state?.theatreName;
  const showTime = location.state?.showTime;

  /* If user refreshes page and state disappears */
  if (!location.state) {
    return (
      <div className="p-10 text-center text-gray-400">
        <p className="mb-4 text-lg">Session expired</p>

        <button
          onClick={() => navigate(-1)}
          className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="mb-8">

        <h1 className="text-2xl text-yellow-400 font-bold mb-3">
          Select Seats
        </h1>

        {/* MOVIE TITLE */}
        {movieTitle && (
          <h2 className="text-xl font-bold text-white">
            {movieTitle}
          </h2>
        )}

        {/* THEATRE + TIME */}
        <div className="text-gray-300 mt-2 space-y-1">

          {theatreName && (
            <p className="text-lg font-semibold text-yellow-300">
              {theatreName}
            </p>
          )}

          {showTime && (
            <p>
              {new Date(showTime).toLocaleString([], {
                weekday: "short",
                day: "numeric",
                month: "short",
                hour: "2-digit",
                minute: "2-digit"
              })}
            </p>
          )}

        </div>

      </div>


      {/* SEAT GRID */}
      <SeatGrid showId={showId} />

    </div>
  );
}

export default SeatSelection;