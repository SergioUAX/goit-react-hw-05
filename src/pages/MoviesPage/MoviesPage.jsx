import fetchMovies from "../../tmdb-api";
import { useEffect } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import Pagination from "../../components/Pagination/Pagination";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

function MoviesPage({
  movies,
  setMovies,
  loading,
  setLoading,
  currentPage,
  queryParam,
  totalPages,
  setTotalPages,
  onSearchParamsChange,
  onPageChange,
}) {
  // useEffect(() => {
  //   const loadSearchResults = async () => {
  //     if (!queryParam.trim()) return;

  //     try {
  //       setLoading(true);
  //       const data = await fetchMovies("search", queryParam, currentPage);
  //       setMovies(data.results || []);
  //       setTotalPages(data.total_pages || 1);
  //     } catch (err) {
  //       ErrorMessage(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadSearchResults();
  // }, [queryParam, currentPage, setLoading, setMovies, setTotalPages]);

  const handleSearch = (query) => {
    // if (!query.trim()) {
    //   ErrorMessage("Please enter a search topic !!!");
    //   return;
    // }
    // onSearchParamsChange({ query: query.trim(), page: "1" });
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {/* {loading ? <Loader /> : <MovieList movies={movies} />}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} /> */}
    </>
  );
}

export default MoviesPage;
