import { useEffect, useState } from "react";
import api from "../services/api";
import MovieCarousel from "../components/movies/MovieCarousel";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get("movies/")
      .then(res => setMovies(res.data))
      .catch(err => {
        console.error(err);
        setError("Failed to load movies");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-gray-400">Loading movies...</p>;

  if (error)
    return <p className="text-center mt-10 text-red-500">{error}</p>;

  if (movies.length === 0)
    return <p className="text-center mt-10 text-gray-400">No movies available</p>;

  return <MovieCarousel movies={movies} />;
}

export default Home;
