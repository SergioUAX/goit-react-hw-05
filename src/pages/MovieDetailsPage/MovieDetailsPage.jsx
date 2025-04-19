import { useParams, useLocation, useNavigate, Outlet, Link } from 'react-router-dom';
import styles from './MovieDetailsPage.module.css';
import Loader from '../../components/Loader/Loader';

const MovieDetailsPage = ({ movie, loading }) => {
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(location.state?.from ?? '/movies');
  };

  if (loading) return <Loader />;
  if (!movie) return <div>No movie data available</div>;

  const {
    poster_path,
    title,
    vote_average,
    overview,
    genres = [],
    release_date
  } = movie;

  const releaseYear = release_date ? new Date(release_date).getFullYear() : 'N/A';
  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w300${poster_path}`
    : 'https://via.placeholder.com/300x450';

  return (
    <div className={styles.moviedetailspage}>
      <button onClick={handleGoBack}>← Go back</button>

      <div className={styles.detailsContainer}>
        <img
          src={imageUrl}
          alt={title || 'Movie Poster'}
        />

        <div className={styles.movieInfo}>
          <h2>{title} ({releaseYear})</h2>
          <p><strong>User Score:</strong> {Math.round(vote_average * 10)}%</p>

          <h3>Overview</h3>
          <p>{overview}</p>

          <h3>Genres</h3>
          <p>
            {genres.length > 0
              ? genres.map(g => <span key={g.name}>{g.name} </span>)
              : 'No genres available'}
          </p>
        </div>
      </div>

      <div className={styles.additionalInfo}>
        <h4>Additional information</h4>
        <ul>
          <li>
            <Link to={`/movies/${movieId}/cast`} state={{ from: location.state?.from }}>
              Cast
            </Link>
          </li>
          <li>
            <Link to={`/movies/${movieId}/reviews`} state={{ from: location.state?.from }}>
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
