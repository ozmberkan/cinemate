import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovies } from "~/redux/slices/moviesSlice";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "~/firebase/firebase";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import { getUserById } from "~/redux/slices/userSlice";

const AddList = () => {
  const dispatch = useDispatch();
  const { movies, isLoading } = useSelector((state) => state.movies);
  const { user } = useSelector((state) => state.user);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [listName, setListName] = useState("");

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
    setSelectedMovies((selectedMovies) => [...selectedMovies, movie]);
  };

  const removeMovie = (movieTitle) => {
    setSelectedMovies((prevSelectedMovies) =>
      prevSelectedMovies.filter((movie) => movie.title !== movieTitle)
    );
  };

  const finishSelection = async () => {
    if (!listName.trim()) {
      alert("Lütfen bir liste adı girin.");
      return;
    }

    try {
      const userRef = doc(db, "users", user.uid);
      const newList = {
        listName: listName,
        movies: selectedMovies,
      };

      await updateDoc(userRef, {
        lists: arrayUnion(newList),
      });

      dispatch(getUserById(user.uid));
      setSelectedMovies([]);
      setListName("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full p-5 flex flex-grow gap-y-5 justify-center items-center bg-bg bg-no-repeat bg-center bg-cover py-32  h-screen bg-blue-500">
      <div className="flex gap-10">
        <ul className="w-full grid grid-cols-6 gap-5">
          {movies.map((movie, index) => (
            <div className="relative" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                className="object-cover rounded-md shadow-md w-full h-[120px]"
                alt={movie.title}
              />
              <button
                onClick={() =>
                  selectMovie({
                    title: movie.title,
                    image: movie.backdrop_path,
                  })
                }
                className="absolute top-3 right-3 text-4xl text-red-500"
                disabled={selectedMovies.some(
                  (selected) => selected.title === movie.title
                )}
              >
                <IoAddCircleOutline />
              </button>
            </div>
          ))}
        </ul>
        <div className="w-1/4 bg-gray-100 p-5 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Seçilen Filmler</h2>
          <input
            type="text"
            placeholder="Liste adı girin"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            className="w-full mb-4 p-2 border rounded"
          />
          <ul>
            {selectedMovies.map((movie, index) => (
              <li
                key={index}
                className="mb-2 flex items-center justify-between"
              >
                {movie.title}
                <button onClick={() => removeMovie(movie.title)}>
                  <IoRemoveCircleOutline className="text-red-500 text-xl" />
                </button>
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
