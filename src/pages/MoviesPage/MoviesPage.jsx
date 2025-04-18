import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import fetchMovies from '../../tmdb-api';
import styles from './MoviesPage.module.css';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import Pagination from '../../components/Pagination/Pagination';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const page = Number(searchParams.get('page')) || 1;

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!query) return;
    const fetchSearch = async () => {
      setLoading(true);
      try {
        const data = await fetchMovies('search', query, page );
        setMovies(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSearch();
  }, [query, page]);

  const handleSearch = value => {
    if (!value) return;
    setSearchParams({ query: value, page: 1 });
  };

  const nextPage = () => {
    setSearchParams({ query, page: page + 1 });
  };

  const previousPage = () => {
    setSearchParams({ query, page: page - 1 });
  };

  return (
    <div className={styles.moviespage}>
      <SearchBar onSearch={handleSearch} />
      {loading && <Loader />}
      {movies.length > 0 && !loading && (
        <>
          <MovieList movies={movies} state={{ from: location }} />
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={page}
              nextPage={nextPage}
              previousPage={previousPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default MoviesPage;
