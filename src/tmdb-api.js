import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/";
const accessKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTZkNDVmOTM2NzRhYzU4MzU3ZmM5YWUxZTQ1OTY5ZiIsIm5iZiI6MTc0NDgwMjQ2Ni42ODMsInN1YiI6IjY3ZmY5MmEyMmM4NWU3OTY2Mzk5MWNiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0ARgAua3kmDjzhVrcv1wmGuzK4zwgqAgY56rHcFi6lY";

export const fetchTrendingMovies = async () => {
  const response = await axios.get('3/trending/movie/day?language=en-US', {
    headers: {      
      Authorization: "Bearer " + accessKey,
      accept: 'application/json',
    },
  });
  return response.data;
};

export const fetchMoviesWithTopic = async (page, topic) => {
  const response = await axios.get('3/search/movie', {
    headers: {      
      Authorization: "Bearer " + accessKey,
      accept: 'application/json',      
      page: page,
      query: topic,
    },
  });
  return response.data;
};
