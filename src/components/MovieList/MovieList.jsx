import styles from './MovieList.module.css';

const MovieList = ({ movies }) => {
    return (
        <ul className={styles.movielist}>   
            {movies.map((movie) => (
                <li key={movie.id} onClick={() => onMovieClick(movie)}>
                    <p>{movie.title}</p>
                </li>
            ))}
        </ul>
    );
};

export default MovieList;