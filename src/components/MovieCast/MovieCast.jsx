import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import styles from "./MovieCast.module.css";
import default_img from "../../images/default_img.jpg";
import fetchMovies from "../../tmdb-api";

function MovieCast() {
  const { movieId } = useParams();
  const [casts, setCasts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCasts = async () => {
      try {
        setLoading(true);       
        const data = await fetchMovies("cast", movieId, null);
        setCasts(data.cast);        
      } catch (error) {
        console.error("Error fetching cast data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadCasts();
  }, [movieId]);

  return (
    <div className={styles.castList}>
      <p>Movie cast</p>
      {loading ? <Loader /> : (
        casts.length > 0 ? casts.map(actor => (
          <div key={actor.id} className={styles.card}>
            <img
              src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : default_img}
              alt={actor.name}
              className={styles.image}
            />
            <div className={styles.info}>
              <p>{actor.name}</p>
              <p className={styles.character}>Character: {actor.character}</p>
            </div>
          </div>
        )) : <p>Cast information is not available.</p>
      )}
    </div>
  );
}

export default MovieCast;
