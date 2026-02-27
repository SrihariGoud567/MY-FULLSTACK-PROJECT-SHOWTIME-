import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import MovieHero from "../components/movies/MovieHero";
import MovieInfo from "../components/movies/MovieInfo";
import MovieCastCrew from "../components/movies/MovieCastCrew";


function MovieDetails() {

  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`movies/${id}/`)
      .then(res => {
        setMovie(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return <p className="text-center mt-20 text-white">Loading movie...</p>;

  if (!movie)
    return <p className="text-center mt-20 text-red-500">Movie not found</p>;

  return (
    <div className="bg-black min-h-screen">

      <MovieHero movie={movie} />
      <MovieInfo movie={movie} />
      <MovieCastCrew people={movie.people || []} />


    </div>
  );
}


export default MovieDetails;
