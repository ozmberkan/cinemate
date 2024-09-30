import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovies } from "~/redux/slices/moviesSlice";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "~/firebase/firebase";
import { IoAddCircleOutline } from "react-icons/io5";

const AddList = () => {
  const dispatch = useDispatch();
  const { movies, isLoading } = useSelector((state) => state.movies);
  const { user } = useSelector((state) => state.user);
  const [selectedMovies, setSelectedMovies] = useState([]);

  useEffect(() => {
    dispatch(getAllMovies());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="w-full h-screen items-center flex justify-center">
        Yükleniyor..
      </div>
    );
  }

  const selectMovie = (movie) => {
    if (selectedMovies.length >= 3) {
      alert("Listeye en fazla 3 film ekleyebilirsiniz.");
      return;
    }

    setSelectedMovies((prevSelectedMovies) => [...prevSelectedMovies, movie]);
  };

  const finishSelection = async () => {
    if (selectedMovies.length !== 3) {
      alert("Lütfen 3 film seçin.");
      return;
    }

    try {
      const savedUser = JSON.parse(localStorage.getItem("user"));
      const currentMovies = savedUser?.movies || [];

      const updatedMovies = [...currentMovies, selectedMovies];

      const updatedUser = {
        ...savedUser,
        movies: updatedMovies,
      };

      const userRef = doc(db, "users", user.uid);

      await updateDoc(userRef, {
        movies: arrayUnion({
          selectedMovies,
        }),
      });

      localStorage.setItem("user", JSON.stringify(updatedUser));

      console.log("Filmler localStorage'a eklendi");

      setSelectedMovies([]);
      localStorage.removeItem("selectedMovies");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full p-5 flex flex-col gap-y-5">
      <h1 className="text-4xl font-semibold">Liste Oluştur!</h1>
      <div className="flex gap-10">
        <ul className="w-3/4 grid grid-cols-4 gap-5">
          {movies.map((movie, index) => (
            <div className="relative" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                className="object-cover rounded-md shadow-md w-full h-[130px]"
                alt={movie.title}
              />
              <button
                onClick={() =>
                  selectMovie({
                    title: movie.title,
                    image: movie.backdrop_path,
                  })
                }
                className="absolute top-3 right-3 text-4xl text-yellow-500"
              >
                <IoAddCircleOutline />
              </button>
            </div>
          ))}
        </ul>
        <div className="w-1/4 bg-gray-100 p-5 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Seçilen Filmler</h2>
          <ul>
            {selectedMovies.map((movie, index) => (
              <li key={index} className="mb-2">
                {movie.title}
              </li>
            ))}
          </ul>
          {selectedMovies.length === 3 && (
            <button
              onClick={finishSelection}
              className="bg-blue-500 text-white w-full rounded-md py-2 mt-4"
            >
              Seçimi Bitir
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddList;
