export const MovieService = {
  async fetchMovies(page = 1) {
    const BASE_URL =
      import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
    const endpoint = `${BASE_URL}/movie/day?pageNo=${page}`;

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();

      return {
        results: data.results || [],
        totalPages: Math.min(data.total_pages || 0, 500),
      };
    } catch (error) {
      throw error;
    }
  },
};
