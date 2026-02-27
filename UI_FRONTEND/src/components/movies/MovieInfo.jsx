function MovieInfo({ movie }) {

  return (
    <div className="max-w-5xl mx-auto mt-10 px-6">

      <h2 className="text-2xl font-bold text-yellow-400">
        About the Movie
      </h2>

      <p className="mt-4 text-gray-300 leading-7">
        {movie.description}
      </p>

    </div>
  );
}

export default MovieInfo;
