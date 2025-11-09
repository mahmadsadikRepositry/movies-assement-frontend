import { useState, useEffect } from "react";
import { MovieService } from "../service/movieService";

const useMovies = (page) => {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const { results, totalPages } = await MovieService.fetchMovies(page);
        setMovies(results);
        setTotalPages(totalPages);
      } catch (err) {
        setError("Failed to fetch movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  return { movies, totalPages, loading, error };
};

export default useMovies;
