import axios from "axios";
import type { Movie } from "../types/movie";

const API_URL = `https://api.themoviedb.org/3/search/movie`;
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

interface MovieResponse {
  results: Movie[];
  page: number;
  total_pages: number;
}

export default async function fetchMovies(
  query: string,
  page: number
): Promise<{ results: Movie[]; total_pages: number }> {
  const response = await axios.get<MovieResponse>(API_URL, {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page,
    },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return {
    results: response.data.results,
    total_pages: response.data.total_pages,
  };
}
