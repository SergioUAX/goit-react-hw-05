import { Routes, Route, NavLink } from "react-router-dom";
import { useState, useEffect } from 'react';
// import { Toaster } from 'react-hot-toast';
import clsx from 'clsx';
import styles from './App.module.css';
import HomePage from '../../pages/HomePage/HomePage';
import MoviesPage from '../../pages/MoviesPage/MoviesPage';
import MovieDetailsPage from '../../pages/MovieDetailsPage/MovieDetailsPage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import MovieCast from '../MovieCast/MovieCast';
import MovieReviews from '../MovieReviews/MovieReviews';
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { fetchTrendingMovies, fetchMoviesWithTopic } from "../../tmdb-api";
import { Toaster } from "react-hot-toast";

const buildLinkClass = ({ isActive }) => {
  return clsx(styles.link, isActive && styles.active);
};

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [topic, setTopic] = useState('');


  const handleSearch = (searchTopic) => {
      if (searchTopic.trim() === '') {
        ErrorMessage("Please enter a search topic !!!");
      return;
      }  
      setMovies([]);
      setTopic(searchTopic);
  };
  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await fetchTrendingMovies();
        setMovies(data.results);
        setPage(2);        
      } catch (err) {
        ErrorMessage(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);
  
  useEffect(() => {
    const fetchMovies = async () => {
      if (topic.trim() === '') return;  
      try {
        setLoading(true);
        const data = await fetchMoviesWithTopic(1, topic);
        console.log('MOVIES WITH TOPIC ', topic, 'ARE: ', data.results);
        setImages(data.results);
        setPage(2);
      } catch (err) {
        ErrorMessage(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
    }, [topic]);

  return (
    <div>
      <nav className={styles.nav}>
        <NavLink to="/" className={buildLinkClass}>
          Home
        </NavLink>
        <NavLink to="/moviespage" className={buildLinkClass}>
          Movies
        </NavLink>        
      </nav>
      <Toaster />

      <Routes>
        <Route path="/" element={<HomePage movies={movies} loading={loading} />} />
        <Route path="/moviespage" element={<MoviesPage movies={movies} loading={loading} handleSearch={handleSearch} />} />
        <Route path="/moviedetailspage" element={<MovieDetailsPage />} >
          <Route path="moviecast" element={<MovieCast />} />
          <Route path="moviereviews" element={<MovieReviews />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>     
      
    </div>   

  );
};

export default App;
