import { useState } from "react";
import MovieCard from "./MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

function MovieCarousel({ movies }) {
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="px-6 mt-10">

      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-yellow-400 text-2xl font-bold">
          Movies In Your City
        </h1>

        <button
          onClick={() => setShowAll(!showAll)}
          className="text-yellow-400 font-semibold hover:text-yellow-300 transition"
        >
          {showAll ? "SEE LESS ←" : "SEE MORE →"}
        </button>
      </div>

      {/* GRID VIEW */}
      {showAll ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        /* CAROUSEL VIEW */
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          spaceBetween={20}
          slidesPerView={5}
          breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
          className="relative"
        >
          <div className="custom-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer">
            <div className="bg-black/70 hover:bg-yellow-400 text-yellow-400 hover:text-black transition p-3 rounded-full shadow-lg">
              &#10094;
            </div>
          </div>

          <div className="custom-next absolute right-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer">
            <div className="bg-black/70 hover:bg-yellow-400 text-yellow-400 hover:text-black transition p-3 rounded-full shadow-lg">
              &#10095;
            </div>
          </div>



          {movies.map(movie => (
            <SwiperSlide key={movie.id}>
              <MovieCard movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}

export default MovieCarousel;
