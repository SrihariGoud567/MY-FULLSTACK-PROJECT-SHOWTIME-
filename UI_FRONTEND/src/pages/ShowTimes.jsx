import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import TheatreCard from "../components/showtimes/TheatreCard";
import DateSelector from "../components/showtimes/DateSelector";

function ShowTimes() {

  const { movieId } = useParams();

const location = useLocation();
const movieTitle = location.state?.movieTitle;

  const [shows, setShows] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  /* FETCH SHOW DATA */
  useEffect(() => {
    api.get(`shows/movie/${movieId}/`)
      .then(res => setShows(res.data))
      .catch(err => console.log(err));
  }, [movieId]);


  /* GENERATE UNIQUE DATES FROM API */
  const allDates = Object.values(shows)
    .flat()
    .map(show => show.time.split("T")[0]);

  const uniqueDates = [...new Set(allDates)].sort();


  /* AUTO SELECT FIRST DATE */
  useEffect(() => {
    if (!selectedDate && uniqueDates.length > 0) {
      setSelectedDate(uniqueDates[0]);
    }
  }, [uniqueDates]);


  return (
    <div className="px-6 py-6">

      {/* DATE SELECTOR */}
      <DateSelector
        dates={uniqueDates}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      {/* THEATRES */}
      {Object.keys(shows).map(theatre => {

        const filtered = shows[theatre].filter(show =>
          show.time.startsWith(selectedDate)
        );

        if (filtered.length === 0) return null;

        return (
          <TheatreCard
            key={theatre}
            theatre={theatre}
            timings={filtered}
            movieTitle={movieTitle}
          />
        );
      })}

    </div>
  );
}

export default ShowTimes;