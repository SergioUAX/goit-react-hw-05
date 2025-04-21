import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Outlet, NavLink } from 'react-router-dom';
import styles from './MovieDetailsPage.module.css';
import Loader from '../../components/Loader/Loader';
import default_img from '../../images/default_img.jpg';
import fetchMovies from '../../tmdb-api';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});

  const {
    poster_path,
    title,
    vote_average,
    overview,
    genres = [],
    release_date
  } = movie;
  
  const releaseYear = release_date
    ? new Date(release_date).getFullYear() : 'N/A';
  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w300${poster_path}`
    : default_img;
  const voteInPercent = vote_average
    ? `${Math.round(vote_average * 10)} %` : 'N/A';
  
  useEffect(() => {
    const loadMovieById = async () => {
      try {
        setLoading(true);
        const data = await fetchMovies('id', movieId, null);
        setMovie(data);
      } catch (error) {
        console.error('Failed to load movie by ID:', movieId, ' with error: ', error);
      } finally {
        setLoading(false);
      }
    };
    loadMovieById();
  }, [movieId]);

  return (
    <div>
      {loading && <Loader />}
      {!loading &&        
          <div className={styles.moviedetailspage}>
            {/* <button onClick={handleGoBack}>← Go back</button> */}
            <div className={styles.detailsContainer}>
              <img
                src={imageUrl}
                alt={title || 'Movie Poster'}
              />

              <div className={styles.movieInfo}>
                <h2>{title} ({releaseYear})</h2>
                <p><strong>User Score: </strong>{voteInPercent}</p>
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
              <h4>Additional information {movieId}</h4>
              <ul>
                <li>
                  {/* <NavLink to={`/movies/${movieId}/cast`} state={{ from: location.state?.from }}> */}
                  <NavLink to='cast' >
                    Cast
                  </NavLink>
                </li>
                <li>
                  {/* <NavLink to={`/movies/${movieId}/reviews`} state={{ from: location.state?.from }}> */}
                  <NavLink to='reviews'>
                    Reviews
                  </NavLink>
                </li>
              </ul>
            </div>
            <Outlet />
          </div>        
      }
      </div> 
            
  );
};

export default MovieDetailsPage;
