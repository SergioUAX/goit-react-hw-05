import { Routes, Route} from "react-router-dom";
import { useState, useEffect } from 'react';
import { Toaster } from "react-hot-toast";
import styles from './App.module.css';
import HomePage from '../../pages/HomePage/HomePage';
import MoviesPage from '../../pages/MoviesPage/MoviesPage';
import MovieDetailsPage from '../../pages/MovieDetailsPage/MovieDetailsPage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import MovieCast from '../MovieCast/MovieCast';
import MovieReviews from '../MovieReviews/MovieReviews';
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Navigation from "../Navigation/Navigation";
import fetchMovies from "../../tmdb-api";



function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
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
    const getMovies = async (request, topic, page) => {
      try {
        setLoading(true);
        const data = await fetchMovies(request, topic, page);
        setMovies(data.results);
        setPage(2);        
      } catch (err) {
        ErrorMessage(err.message);
      } finally {
        setLoading(false);
      }
    };
    getMovies(request, topic, 1);
  }, []);
  
  useEffect(() => {
    // const fetchMovies = async () => {
    //   if (topic.trim() === '') return;  
    //   try {
    //     setLoading(true);
    //     const data = await fetchMoviesWithTopic(1, topic);
    //     console.log('MOVIES WITH TOPIC ', topic, 'ARE: ', data.results);
    //     setImages(data.results);
    //     setPage(2);
    //   } catch (err) {
    //     ErrorMessage(err.message);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchMovies();
  }, [topic]);
  
  const handleLoadMore = async () => {
      // if (topic.trim() === '') {
      //   ErrorMessage("Please enter a search topic !!!");
      //   return;
      // }
      // try {
      //   setLoading(true);
      //   const data = await fetchMoviesWithTopic(page, topic);
      //   setMovies((prevMovies) => [...prevMovies, ...data.results]);
      //   setPage((prevPage) => prevPage + 1);
      // } catch (err) {
      //   ErrorMessage(err.message);
      // } finally {
      //   setLoading(false);
      // }
    };

  return (
    <div>
      <Navigation />
      <Toaster />

      <Routes>
        <Route path="/" element={
          <HomePage
            movies={movies}
            loading={loading}            
          />}
        />
        <Route path="/moviespage" element={
          <MoviesPage
            movies={movies}
            loading={loading}
            handleSearch={handleSearch}
          />}
        />
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
