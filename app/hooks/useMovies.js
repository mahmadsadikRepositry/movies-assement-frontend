import { useState, useEffect } from "react";
import { MovieService } from "../services/movieService";

export const useMovies = (view, page) => {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (view === "favorites") {
      setMovies([]);
      return;
    }

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
  }, [view, page]);

  return { movies, totalPages, loading, error };
};
