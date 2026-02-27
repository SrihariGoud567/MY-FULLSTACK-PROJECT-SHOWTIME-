const BASE = "http://127.0.0.1:8000";

function MovieCastCrew({ people }) {

  const cast = people.filter(p => p.type === "CAST");
  const crew = people.filter(p => p.type === "CREW");

  const Card = ({ person }) => (
    <div className="text-center">

      {/* Photo */}
      <div className="inline-block">

        <img
          src={BASE + person.photo}
          alt={person.name}
          className="w-32 h-32 object-cover mx-auto rounded-full border-4 border-yellow-400"
        />

      </div>

      {/* Name */}
      <h3 className="mt-3 font-semibold text-sm text-yellow-300">
        {person.name}
      </h3>

      {/* Role */}
      <p className="text-gray-400 text-xs">
        {person.type === "CAST" ? "as " : ""}
        <span className="text-gray-300">{person.role}</span>
      </p>

    </div>
  );

  return (
    <div className="max-w-6xl mx-auto mt-20 px-6">

      {/* CAST */}
      {cast.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-8 text-yellow-400 border-b border-yellow-500/30 pb-2">
            Cast
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10">
            {cast.map(p => <Card key={p.id} person={p} />)}
          </div>
        </>
      )}

      {/* CREW */}
      {crew.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mt-16 mb-8 text-yellow-400 border-b border-yellow-500/30 pb-2">
            Crew
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10">
            {crew.map(p => <Card key={p.id} person={p} />)}
          </div>
        </>
      )}

    </div>
  );
}

export default MovieCastCrew;