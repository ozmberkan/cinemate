import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovies } from "~/redux/slices/moviesSlice";

const Home = () => {
  const dispatch = useDispatch();

  return <div>Home</div>;
};

export default Home;
