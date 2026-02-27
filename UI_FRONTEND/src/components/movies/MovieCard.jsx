import { useNavigate } from "react-router-dom";

function MovieCard({ movie }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/movie/${movie.id}`, { state: { movie } })}

      className="cursor-pointer group"
    >
      {/* Poster */}
      <div className="rounded-xl overflow-hidden relative">

        <img
          src={`http://127.0.0.1:8000${movie.poster}`}
          alt={movie.title}
          className="h-[450px] w-full object-cover "
        />

        {/* Rating */}
        <div className="absolute bottom-0 w-full bg-black/80 text-white text-sm px-2 py-1 flex items-center gap-2">
          ⭐ {movie.rating ?? "N/A"}/10
        </div>
      </div>

      {/* Title */}
      <h2 className="mt-3 text-yellow-400 font-bold text-lg">
        {movie.title}
      </h2>

      {/* Genre */}
      <p className="text-gray-400 text-sm">
        {movie.genre ?? "Genre not available"}
      </p>
    </div>
  );
}

export default MovieCard;
