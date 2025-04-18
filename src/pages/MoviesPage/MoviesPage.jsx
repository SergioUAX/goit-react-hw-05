import styles from './MoviesPage.module.css';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import Pagination from '../../components/Pagination/Pagination';

const MoviesPage = ({ movies, loading, handleSearch, handleLoadMore}) => {
    return (
        <div className={styles.moviespage}>   
            <SearchBar onSearch={handleSearch} />
            {loading && <Loader />}            
            {movies.length > 0 && !loading && <MovieList movies={movies} />}    
            {movies.length > 0 && !loading && <Pagination />}
        </div>
    );
};

export default MoviesPage;