import { useState, useEffect } from "react";
import MovieCard from "../Components/MovieCard";

function Welcome() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    setMovies([]);

    const fetchMovies = async () => {
      setLoading(true);

      try {
        let url = "";
        const BASE_URL =
          import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

        url = `${BASE_URL}/movie/trending/day?pageNo=${page}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch movies");

        const data = await res.json();
        console.log("Backend movie data:", data);

        setMovies(data.results || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  return (
    <div className="container mx-auto p-4 flex flex-col items-center text-center">
      <h1 className="text-4xl font-extrabold mb-6 drop-shadow-2xl">
        Movie List
      </h1>

      {!loading && movies.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Welcome;
