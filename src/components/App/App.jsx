import { Routes, Route} from "react-router-dom";
import { useState, useEffect } from 'react';
import { Toaster } from "react-hot-toast";
import { Suspense, lazy } from 'react';
import styles from './App.module.css';
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import Navigation from "../Navigation/Navigation";
import fetchMovies from "../../tmdb-api";

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('../../pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() => import('../../pages/MovieDetailsPage/MovieDetailsPage'));
const MovieCast = lazy(() => import('../MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('../MovieReviews/MovieReviews'));
const NotFoundPage = lazy(() => import('../NotFoundPage/NotFoundPage'));

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  //const [page, setPage] = useState(1);
  const [topic, setTopic] = useState('');
  const [request, setRequest] = useState('');

  const handleSearch = (searchTopic) => {
      if (searchTopic.trim() === '') {
        ErrorMessage("Please enter a search topic !!!");
      return;
      }  
      setMovies([]);
      setTopic(searchTopic);
  };  
  
  useEffect(() => {
    const loadTrending = async () => {
      try {
        setLoading(true);
        const data = await fetchMovies('trending','',currentPage);
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (err) {
        ErrorMessage(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadTrending();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
      
  return (
    <Suspense fallback={<Loader />}>
      <Navigation />
      <Toaster />

      <Routes>
        <Route path="/" element={
          <HomePage
            movies={movies}
            loading={loading}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />}
        />
        <Route path="/moviespage" element={
          <MoviesPage
            movies={movies}
            loading={loading}
            handleSearch={handleSearch}
          />}
        />
        <Route path="/movies/:movieId/*" element={<MovieDetailsPage />} >
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>     
      
    </Suspense>  

  );
};

export default App;
