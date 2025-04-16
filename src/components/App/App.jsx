import { Routes, Route, NavLink } from "react-router-dom";
// import { Toaster } from 'react-hot-toast';
import clsx from 'clsx';
import { useState } from 'react';
import styles from './App.module.css';
import HomePage from '../../pages/HomePage/HomePage';
import MoviesPage from '../../pages/MoviesPage/MoviesPage';
import MovieDetailsPage from '../../pages/MovieDetailsPage/MovieDetailsPage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import MovieCast from '../MovieCast/MovieCast';
import MovieReviews from '../MovieReviews/MovieReviews';

const buildLinkClass = ({ isActive }) => {
  return clsx(styles.link, isActive && styles.active);
};

function App() {
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
        <Route path="/" element={<HomePage />} />
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
