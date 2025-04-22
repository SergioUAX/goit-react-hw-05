import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import styles from "./MovieReviews.module.css";
import fetchMovies from "../../tmdb-api";

function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setLoading(true);       
        const data = await fetchMovies("reviews", movieId, 1);
        setReviews(data.results);        
      } catch (error) {
        console.error("Error fetching reviews data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadReviews();
  }, [movieId]);

  return (
    <div className={styles.moviereviews}>      
      {loading ? <Loader /> : (
        reviews.length > 0 ? (
          reviews.map(review => (
            <div key={review.id} className={styles.reviewCard}>
              <h4 className={styles.author}>Author: {review.author}</h4>
              <p className={styles.content}>{review.content}</p>
            </div>
          ))
        ) : <p>We don't have any reviews for this movie.</p>
      )}
    </div>
  );
}

export default MovieReviews;
