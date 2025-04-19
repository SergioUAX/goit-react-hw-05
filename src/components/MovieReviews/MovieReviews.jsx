import styles from './MovieReviews.module.css';
import Loader from '../Loader/Loader';

const MovieReviews = ({ reviews, loading }) => {
  if (loading) return <Loader />;
  if (!loading && (!reviews || reviews.length === 0)) {
    return <p>We don't have any reviews for this movie.</p>;
  }

  return (
    <ul className={styles.moviereviews}>
      {reviews.map(({ id, author, content }) => (
        <li key={id}>
          <h4>Author: {author}</h4>
          <p>{content}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;
