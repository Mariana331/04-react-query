import { useState } from "react";
import type { Movie } from "../../types/movie";
import { Toaster } from "react-hot-toast";
import fetchMovies from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Pagination from "../ReactPaginate/ReactPaginate";

export default function App() {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["movies", query, currentPage],
    queryFn: () => fetchMovies(query, currentPage),
    enabled: query !== "",
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.total_pages ?? 0;

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const openModal = (movie: Movie) => {
    setSelectedMovie(movie);
  };
  const closeModal = () => {
    setSelectedMovie(null);
  };

  const handleSubmit = async (newQuery: string) => {
    setQuery(newQuery);
    setCurrentPage(1);
  };

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      {isSuccess && totalPages > 1 && (
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          setPage={setCurrentPage}
        />
      )}
      <Toaster position="top-center" />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {data?.results && data.results.length > 0 && (
        <MovieGrid movies={data.results} onSelect={openModal} />
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </>
  );
}
