import styles from './MovieList.module.css';
import { Link, useLocation } from 'react-router-dom';

const MovieList = ({ movies, state }) => {
    const location = useLocation();
    return (
        <ul className={styles.movielist}>   
            {movies.map((movie) => (
                <li key={movie.id}>
                    <Link to={`/movies/${movie.id}`} state={state}>
                        {movie.title}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default MovieList;
