import styles from './MoviesPage.module.css';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';

const MoviesPage = ({ movies, loading, handleSearch}) => {
    return (
        <div className={styles.moviespage}>   
            <SearchBar onSearch={handleSearch} />
            {loading && <Loader />}
            <MovieList movies={movies} />
        </div>

    );
};

export default MoviesPage;