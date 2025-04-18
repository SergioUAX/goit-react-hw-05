import axios from "axios";

const apiBaseURL = "https://api.themoviedb.org/";
const accessKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTZkNDVmOTM2NzRhYzU4MzU3ZmM5YWUxZTQ1OTY5ZiIsIm5iZiI6MTc0NDgwMjQ2Ni42ODMsInN1YiI6IjY3ZmY5MmEyMmM4NWU3OTY2Mzk5MWNiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0ARgAua3kmDjzhVrcv1wmGuzK4zwgqAgY56rHcFi6lY";

const fetchMovies = async (request, topic, page) => {
  
  let Link = '';
  const headers = {    
    Authorization: `Bearer ${accessKey}`,
    accept: 'application/json',
  };

  switch (request) {
    case 'trending':
      Link = `${apiBaseURL}3/trending/movie/day?language=en-EN&page=${page}`;
      break;
    case 'search':
      Link = `${apiBaseURL}3/search/movie?query=${topic}&language=en-US&page=${page}`;
      break;
    case 'id':
      Link = `${apiBaseURL}3/movie/${topic}?language=en-EN`;
      break;
    case 'cast':
      Link = `${apiBaseURL}3/movie/${topic}/credits?language=en-US`;
      break;
    case 'reviews':
      Link = `${apiBaseURL}3/movie/${topic}/credits?language=en-US`;
      break;
    case 'cast':
      Link = `${apiBaseURL}3/movie/${topic}/reviews?language=en-US&page=${page}`;
      break;
    default: 
      Link = `${apiBaseURL}3/trending/movie/day?language=en-EN&page=${page}`;
      break;
  }

  const response = await axios.get(Link, {headers});
  return response.data;  
};

export default fetchMovies;
