import styles from './HomePage.module.css';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import Pagination from '../../components/Pagination/Pagination';

const HomePage = ({ movies, loading, handleLoadMore}) => {
    return (
        <div className={styles.homepage}>
            <h2>Trending today</h2>
            {loading && <Loader />}
            {movies.length > 0 && !loading && <MovieList movies={movies} />}    
            {movies.length > 0 && !loading && <Pagination />}
        </div>
    );
};

export default HomePage;