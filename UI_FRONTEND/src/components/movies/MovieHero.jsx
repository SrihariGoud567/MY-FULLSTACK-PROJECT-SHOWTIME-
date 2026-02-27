import { useNavigate, useParams } from "react-router-dom";




function MovieHero({ movie }) {

  const navigate = useNavigate();
  const { id } = useParams();



  const BASE_URL = "http://127.0.0.1:8000";

  const posterUrl = movie.poster
    ? BASE_URL + movie.poster
    : "";

  const bannerUrl = movie.banner
    ? BASE_URL + movie.banner
    : posterUrl;

  return (
    <div
      className="relative h-[500px] bg-cover bg-center flex items-end"
      style={{ backgroundImage: `url(${bannerUrl})` }}
    >

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>

      <div className="absolute w-full p-10">

        <div className="max-w-6xl mx-auto flex gap-10 items-center">


          <img
            src={posterUrl}
            alt={movie.title}
            className="w-64 rounded-xl shadow-2xl object-cover"
          />

          <div>

            <h1 className="text-5xl font-extrabold text-yellow-400">
              {movie.title}
            </h1>

            <p className="mt-4 text-lg text-white">
              ⭐ {movie.rating}/10
            </p>

            <p className="mt-2 text-gray-300">
              {movie.language} • {movie.duration} mins
            </p>

            {movie.genre && (
              <p className="mt-2 text-gray-300">
                {movie.genre}
              </p>
            )}

            <button
              onClick={() =>
                navigate(`/shows/${movie.id}`, {
                  state: { movieTitle: movie.title }
                })
              }
              className="mt-6 bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold hover:scale-105 transition">
              Book Tickets
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default MovieHero;
