import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import fetchMovies from '../../tmdb-api';
import styles from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const data = await fetchMovies('reviews', movieId, 1 );
      setReviews(data.results || []);
    };
    fetchReviews();
  }, [movieId]);

  if (reviews.length === 0) {
    return <p>We don’t have any reviews for this movie.</p>;
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
