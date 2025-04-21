import fetchMovies from "../../tmdb-api";
import { useState, useEffect } from "react";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import styles from './HomePage.module.css';
import Pagination from "../../components/Pagination/Pagination";

function HomePage({ }) {
    const [loading, setLoading] = useState(false);
    const [movies, setMovies] = useState([]);

  useEffect(() => {
    const loadTrendingMovies = async () => {
      try {
        setLoading(true);
        const data = await fetchMovies('trending', '', 1);
        setMovies(data.results || []);
        //setTotalPages(data.total_pages || 1);
      } catch (error) {
        console.error('Failed to load trending movies:', error);
      } finally {
        setLoading(false);
      }
    };
    loadTrendingMovies();
  }, []);

  return (
      <div className={styles.homepage}>        
          {loading ? <Loader /> : <MovieList movies={movies} />}
      {/* <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} /> */}
    </div>
  );
}

export default HomePage;
