import styles from './MovieCast.module.css';
import Loader from '../Loader/Loader';
import default_img from '../../images/default_img.jpg';

const MovieCast = ({ cast, loading }) => {
  if (loading) return <Loader />;
  if (!loading && (!cast || cast.length === 0)) {
    return <p>No cast information available.</p>;
  }

  return (
    <ul className={styles.moviecast}>
      {cast.map(({ id, profile_path, name, character }) => (
        <li key={id}>
          <img
            src={profile_path ? `https://image.tmdb.org/t/p/w200${profile_path}` : default_img}
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
