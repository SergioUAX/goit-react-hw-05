import { Routes, Route, useLocation, useSearchParams } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";

import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import Navigation from "../Navigation/Navigation";
import fetchMovies from "../../tmdb-api";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("../../pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() => import("../../pages/MovieDetailsPage/MovieDetailsPage"));
const MovieCast = lazy(() => import("../MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("../MovieReviews/MovieReviews"));
const NotFoundPage = lazy(() => import("../../pages/NotFoundPage/NotFoundPage"));

function App() {
  const location = useLocation();  
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [castLoading, setCastLoading] = useState(false);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const movieId = location.pathname.startsWith("/movies/") ? location.pathname.split("/")[2] : null;
  const queryParam = searchParams.get("query") || "";
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  
  useEffect(() => {
    setCast([]);
    setReviews([]);
    setMovieDetails(null);
  }, [movieId]);

  const loadData = async (type, query = "", page = 1) => {
    try {
      if (type === "cast") setCastLoading(true);
      else if (type === "reviews") setReviewsLoading(true);
      else setLoading(true);

      const data = await fetchMovies(type, query, page);

      switch (type) {
        case "trending":
        case "search":
          setMovies(data.results || []);
          setTotalPages(data.total_pages || 1);
          break;
        case "id":
          setMovieDetails(data);
          break;
        case "cast":
          setCast(data.cast || []);
          break;
        case "reviews":
          setReviews(data.results || []);
          break;
        default:
          break;
      }
    } catch (err) {
      ErrorMessage(err.message);
    } finally {
      if (type === "cast") setCastLoading(false);
      else if (type === "reviews") setReviewsLoading(false);
      else setLoading(false);
    }
  };

  const loadMovieDetailsData = () => {
    if (!movieId) return;
    loadData("id", movieId);

    if (location.pathname.includes("cast")) {
      loadData("cast", movieId);
    }

    if (location.pathname.includes("reviews")) {
      loadData("reviews", movieId);
    }
  };

  useEffect(() => {
    if (location.pathname === "/") {
      setMovies([]);
      setSearchParams({ page: pageParam.toString() }, { replace: true });
      loadData("trending", "", pageParam);
    } else if (location.pathname === "/movies") {
      if (queryParam.trim()) {
        loadData("search", queryParam, pageParam);
      } else {
        setMovies([]);
      }
    } else if (movieId) {
      loadMovieDetailsData();
    }
  }, [location.pathname, queryParam, pageParam]);

  const handleSearch = (query) => {
    if (!query.trim()) {
      ErrorMessage("Please enter a search topic !!!");
      return;
    }
    setSearchParams({ query: query.trim(), page: "1" });
  };

  const handlePageChange = (newPage) => {
    if (location.pathname === "/") {
      setSearchParams({ page: newPage.toString() });
    } else if (location.pathname === "/movies") {
      setSearchParams({ query: queryParam, page: newPage.toString() });
    }
  };

  return (
    <Suspense fallback={<Loader />}>
      <Navigation />
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              movies={movies}
              loading={loading}
              currentPage={pageParam}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          }
        />
        <Route
          path="/movies"
          element={
            <MoviesPage
              movies={movies}
              loading={loading}
              onSearch={handleSearch}
              currentPage={pageParam}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          }
        />
        <Route path="/movies/:movieId" element={<MovieDetailsPage movie={movieDetails} loading={loading} />}>
          <Route path="cast" element={<MovieCast cast={cast} loading={castLoading} />} />
          <Route path="reviews" element={<MovieReviews reviews={reviews} loading={reviewsLoading} />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
