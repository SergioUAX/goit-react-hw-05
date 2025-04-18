import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import fetchMovies from '../../tmdb-api';
import styles from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      const data = await fetchMovies('cast', movieId, 1);
      setCast(data.cast || []);
    };
    fetchCast();
  }, [movieId]);

  if (cast.length === 0) {
    return <p>No cast information available.</p>;
  }

  return (
    <ul className={styles.moviecast}>
      {cast.map(({ id, profile_path, name, character }) => (
        <li key={id}>
          <img
            src={profile_path ? `https://image.tmdb.org/t/p/w200${profile_path}` : 'https://via.placeholder.com/100x150'}
            alt={name}
            width={100}
          />
          <p><strong>{name}</strong></p>
          <p>Character: {character}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
