import { useLocation } from 'react-router-dom';
import styles from './HomePage.module.css';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import Pagination from '../../components/Pagination/Pagination';

const HomePage = ({ movies, loading, currentPage, totalPages, onPageChange}) => {
    const location = useLocation();
    
    return (
        <div className={styles.homepage}>
            <h2>Trending today</h2>
            {loading && <Loader />}
            {movies.length > 0 && !loading && <MovieList movies={movies} state={{ from: location }}/>}    
            {totalPages > 1 && !loading && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />
            )}
        </div>
    );
};

export default HomePage;