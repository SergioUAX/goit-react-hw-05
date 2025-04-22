import fetchMovies from "../../tmdb-api";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import styles from './HomePage.module.css';
import Pagination from "../../components/Pagination/Pagination";

function HomePage({ }) {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
    
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadTrendingMovies = async () => {
      try {
        setLoading(true);
        const data = await fetchMovies('trending', '', currentPage);
        setMovies(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch (error) {
        console.error('Failed to load trending movies:', error);
      } finally {
        setLoading(false);
      }
    };
    loadTrendingMovies();
  }, [currentPage]);

  const handlePageChange = (page) => {    
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    setSearchParams({ page });
  };

  return (
      <div className={styles.homepage}>        
          {loading ? <Loader /> : <MovieList movies={movies} />}
      {!loading && movies.length > 0 && <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />}
    </div>
  );
}

export default HomePage;
