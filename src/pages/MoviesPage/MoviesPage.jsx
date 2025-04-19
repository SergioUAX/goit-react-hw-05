import { useLocation } from 'react-router-dom';
import styles from './MoviesPage.module.css';
import SearchBar from '../../components/SearchBar/SearchBar';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import Pagination from '../../components/Pagination/Pagination';

const MoviesPage = ({ movies, loading, onSearch, currentPage, totalPages, onPageChange }) => {
  const location = useLocation();

  return (
    <div className={styles.moviespage}>
      <SearchBar onSearch={onSearch} />
      {loading && <Loader />}
      {movies.length > 0 && !loading && (
        <>
          <MovieList movies={movies} state={{ from: location }} />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default MoviesPage;
