// import styles from './MovieReviews.module.css';
// import Loader from '../Loader/Loader';

// const MovieReviews = ({ reviews, loading }) => {
//   if (loading) return <Loader />;
//   if (!loading && (!reviews || reviews.length === 0)) {
//     return <p>We don't have any reviews for this movie.</p>;
//   }

//   return (
//     <ul className={styles.moviereviews}>
//       {reviews.map(({ id, author, content }) => (
//         <li key={id}>
//           <h4>Author: {author}</h4>
//           <p>{content}</p>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default MovieReviews;

import fetchMovies from "../../tmdb-api";
import { useEffect } from "react";
import Loader from "../Loader/Loader";
import styles from "./MovieReviews.module.css";

function MovieReviews({ reviews, setReviews, loading, setLoading }) {
  // const movieId = window.location.pathname.split("/")[2];

  // useEffect(() => {
  //   const loadReviews = async () => {
  //     try {
  //       setLoading(true);
  //       const data = await fetchMovies("reviews", movieId);
  //       setReviews(data.results || []);
  //     } catch (error) {
  //       console.error("Error fetching reviews data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadReviews();
  // }, [movieId, setReviews, setLoading]);

  return (
    <div className={styles.reviewContainer}>
      <p>Movie reviews</p>
      {/* {loading ? <Loader /> : (
        reviews.length > 0 ? (
          reviews.map(review => (
            <div key={review.id} className={styles.reviewCard}>
              <h4 className={styles.author}>Author: {review.author}</h4>
              <p>{review.content}</p>
            </div>
          ))
        ) : <p>We don't have any reviews for this movie.</p>
      )} */}
    </div>
  );
}

export default MovieReviews;
