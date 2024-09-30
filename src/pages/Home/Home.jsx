import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovies } from "~/redux/slices/moviesSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { movies } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(getAllMovies());
  }, [dispatch]);

  console.log(movies);

  return (
    <div>
      {movies && movies.map((movie) => <div key={movie.id}>{movie.title}</div>)}
    </div>
  );
};

export default Home;
