import styles from './HomePage.module.css';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';

const HomePage = ({ movies, loading, handleLoadMore}) => {
    return (
        <div className={styles.homepage}>
            <h2>Trending today</h2>
            {loading && <Loader />}
            <MovieList movies={movies}
                // onMovieClick={onMovieClick}
            />
            {/* {movies.length > 0 && !loading && <LoadMoreBtn onLoadMore={handleLoadMore} />} */}
        </div>
    );
};

export default HomePage;