import { Routes, Route, NavLink } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import clsx from 'clsx';
import styles from './App.module.css';
import HomePage from '../../pages/HomePage/HomePage';
import MoviesPage from '../../pages/MoviesPage/MoviesPage';
import MovieDetailsPage from '../../pages/MovieDetailsPage/MovieDetailsPage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import MovieCast from '../MovieCast/MovieCast';
import MovieReviews from '../MovieReviews/MovieReviews';

import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { fetchTrendingMovies } from "../../tmdb-api";

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
  
      setImages([]);
      setTopic(searchTopic);
  };
  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await fetchTrendingMovies();
        setMovies(data.results);
        setPage(2);
        //console.log('TRENDING MOVIES: ', data.results);
      } catch (err) {
        ErrorMessage(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
    },[]);

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

      <Routes>
        <Route path="/" element={<HomePage movies={movies}/>} />
        <Route path="/moviespage" element={<MoviesPage />} />
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
