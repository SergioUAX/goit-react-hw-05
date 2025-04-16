import styles from './HomePage.module.css';
import MovieList from '../../components/MovieList/MovieList';

const HomePage = ({ movies }) => {
    return (
        <div className={styles.homepage}>
            <h1>Trending today</h1>
            <MovieList movies={movies}/>
        </div>
    );
};

export default HomePage;