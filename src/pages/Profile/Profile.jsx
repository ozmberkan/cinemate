import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((store) => store.user);

  return (
    <div>
      {user?.movies?.map((movieList, index) => (
        <div key={index} className="grid grid-cols-2 p-5">
          <ul className="flex flex-row">
            {movieList.map((movie, movieIndex) => (
              <li key={movieIndex} className="bg-white rounded-md p-5">
                <p>{movie.title}</p>
                <img
                  src={`https://image.tmdb.org/t/p/original/${movie.image}`}
                  alt={movie.title}
                  className="w-44 rounded-md"
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Profile;
