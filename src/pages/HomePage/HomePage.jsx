import styles from './HomePage.module.css';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';

const HomePage = ({ movies, loading}) => {
    return (
        <div className={styles.homepage}>
            <h2>Trending today</h2>
            {loading && <Loader />}
            <MovieList movies={movies}
                // onMovieClick={onMovieClick}
            />
        </div>
    );
};

export default HomePage;