import axios from "axios";
import type { Movie } from "../types/movie";

const API_URL = `https://api.themoviedb.org/3/search/movie`;
const TOKEN = import.meta.env.VITE_Pexels_TOKEN;

interface MovieResponse {
  results: Movie[];
}

export default async function fetchMovies(query: string): Promise<Movie[]> {
  const response = await axios.get<MovieResponse>(API_URL, {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page: 1,
    },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data.results;
}
