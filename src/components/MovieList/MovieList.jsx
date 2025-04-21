import { Link, useLocation } from 'react-router-dom';
import styles from './MovieList.module.css';

const MovieList = ({ movies }) => {
    const location = useLocation();
    
    return (
        <ul className={styles.movielist}>   
            {movies.map((movie) => (
                <li key={movie.id}>                    
                    <Link state = {location} to = {`/movies/${movie.id}`} >
                             {movie.title} 
                    </Link>                   
                </li>
            ))}
        </ul>
    );
};

export default MovieList;
