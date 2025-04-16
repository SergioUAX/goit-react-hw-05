import styles from './MoviesPage.module.css';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';

const MoviesPage = ({ movies, loading, handleSearch, handleLoadMore}) => {
    return (
        <div className={styles.moviespage}>   
            <SearchBar onSearch={handleSearch} />
            {loading && <Loader />}
            <MovieList movies={movies} />
            {movies.length > 0 && !loading && <LoadMoreBtn onLoadMore={handleLoadMore} />}
        </div>

    );
};

export default MoviesPage;