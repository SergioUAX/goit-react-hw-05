import { useParams, useLocation, useNavigate, Outlet, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import fetchMovies from '../../tmdb-api';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const data = await fetchMovies('id', movieId, 1);
      setMovie(data);
    };
    fetchMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    navigate(location.state?.from ?? '/movies');
  };

  if (!movie) return null;

  const { poster_path, title, vote_average, overview, genres } = movie;

  return (
    <div className={styles.moviedetailspage}>
      <button onClick={handleGoBack}>← Go back</button>
      <div className={styles.detailsContainer}>
        <img
          src={poster_path ? `https://image.tmdb.org/t/p/w300${poster_path}` : 'https://via.placeholder.com/300x450'}
          alt={title}
        />
        <div>
          <h2>{title} ({new Date(movie.release_date).getFullYear()})</h2>
          <p><strong>User Score:</strong> {Math.round(vote_average * 10)}%</p>
          <h3>Overview</h3>
          <p>{overview}</p>
          <h3>Genres</h3>
          <p>{genres.map(g => g.name).join(' ')}</p>
        </div>
      </div>

      <div className={styles.additionalInfo}>
        <h4>Additional information</h4>
        <ul>
          <li>
  <Link
    to={`/movies/${movieId}/cast`}
    state={{ from: location.state?.from }}
  >
    Cast
  </Link>
</li>
<li>
  <Link
    to={`/movies/${movieId}/reviews`}
    state={{ from: location.state?.from }}
  >
    Reviews
  </Link>
</li>
        </ul>
      </div>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
