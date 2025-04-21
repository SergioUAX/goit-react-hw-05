// import styles from './MovieCast.module.css';
// import Loader from '../Loader/Loader';
// import default_img from '../../images/default_img.jpg';

// const MovieCast = ({ cast, loading }) => {
//   if (loading) return <Loader />;
//   if (!loading && (!cast || cast.length === 0)) {
//     return <p>No cast information available.</p>;
//   }

//   return (
//     <ul className={styles.moviecast}>
//       {cast.map(({ id, profile_path, name, character }) => (
//         <li key={id}>
//           <img
//             src={profile_path ? `https://image.tmdb.org/t/p/w200${profile_path}` : default_img}
//             alt={name}
//             width={100}
//           />
//           <p><strong>{name}</strong></p>
//           <p>Character: {character}</p>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default MovieCast;

import fetchMovies from "../../tmdb-api";
import { useEffect } from "react";
import Loader from "../Loader/Loader";
import styles from "./MovieCast.module.css";
import default_img from "../../images/default_img.jpg";

function MovieCast({ cast, setCast, loading, setLoading }) {
  // const movieId = window.location.pathname.split("/")[2];

  // useEffect(() => {
  //   const loadCast = async () => {
  //     try {
  //       setLoading(true);
  //       const data = await fetchMovies("cast", movieId);
  //       setCast(data.cast || []);
  //     } catch (error) {
  //       console.error("Error fetching cast data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadCast();
  // }, [movieId, setCast, setLoading]);

  return (
    <div className={styles.castList}>
      <p>Movie cast</p>
      {/* {loading ? <Loader /> : (
        cast.length > 0 ? cast.map(actor => (
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
      )} */}
    </div>
  );
}

export default MovieCast;
