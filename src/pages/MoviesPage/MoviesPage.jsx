import styles from './MoviesPage.module.css';
import { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import SearchBar from "../../components/SearchBar/SearchBar";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import fetchMovies from "../../tmdb-api";
import Pagination from "../../components/Pagination/Pagination";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

function MoviesPage() {  
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const topic = searchParams.get('query') ?? '';

  const currentPage = parseInt(searchParams.get('page')) || 1;  
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadMoviesByTopic = async () => {
      try {
        setLoading(true);
        const data = await fetchMovies('search', topic, currentPage);
        setMovies(data.results);
        setTotalPages(data.total_pages || 1);
      } catch (error) {
        console.error('Failed to load movies by topic: "',topic, '" with error: ', error);
      } finally {
        setLoading(false);
      }
    };
    loadMoviesByTopic();
  }, [topic, currentPage]);

   const handleSearchTopic = (topic) => {
    if (!topic) {
      ErrorMessage('Please enter a search topic !!!');
      searchParams.delete('query');
      searchParams.delete('page');      
      return setSearchParams(searchParams);      
     }     
     searchParams.set('query', topic);
     searchParams.set('page', 1);
     setSearchParams(searchParams);     
  };

  const handlePageChange = (page) => {    
    if (page < 1 || page > totalPages) return;    
    searchParams.set('page', page);
    setSearchParams(searchParams);
  };

  return (
    <div className={styles.moviespage}>
      <SearchBar onSearchTopic = {handleSearchTopic} />
      {loading ? <Loader /> : <MovieList movies={movies} />}
      {!loading && movies.length>0 && <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />}
    </div>
  );
}

export default MoviesPage;
