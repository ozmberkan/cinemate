import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovies } from "~/redux/slices/moviesSlice";
import {
  arrayUnion,
  collection,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "~/firebase/firebase";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import { getUserById } from "~/redux/slices/userSlice";
import moment from "moment";
import addListSvg from "/Add/AddSvg.svg";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { tailChase } from "ldrs";

const AddList = () => {
  const dispatch = useDispatch();
  const { movies, isLoading } = useSelector((state) => state.movies);
  const { user } = useSelector((state) => state.user);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [listName, setListName] = useState("");
  tailChase.register();
  const createdAt = new Date();
  const formattedDate = moment(createdAt).format("DD.MM.YYYY HH:mm");

  useEffect(() => {
    dispatch(getAllMovies());
  }, [dispatch]);

  // if (isLoading) {
  //   return (
  //     <div className="w-full h-screen items-center flex justify-center">
  //       <l-tail-chase size="40" speed="1.75" color="#B81314"></l-tail-chase>
  //     </div>
  //   );
  // }

  const selectMovie = (movie) => {
    if (selectedMovies.length >= 3) {
      toast.error("Listeye en fazla 3 film ekleyebilirsiniz.");
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
      toast.error("Lütfen bir liste adı girin.");
      return;
    }

    try {
      const userRef = doc(db, "users", user.uid);
      const listsRef = doc(collection(db, "lists"));
      const newList = {
        createdAt: formattedDate,
        creater: user.displayName,
        listName: listName,
        movies: selectedMovies,
        id: listsRef.id,
      };

      await setDoc(listsRef, newList);

      await updateDoc(userRef, {
        lists: arrayUnion(newList),
      });

      dispatch(getUserById(user.uid));
      setSelectedMovies([]);
      setListName("");
      toast.success("Başarıyla liste oluşturuldu!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex flex-col gap-y-5 justify-start items-center bg-bg bg-no-repeat bg-center bg-cover py-32 h-screen ">
      <img src={addListSvg} className="absolute top-0 -z-10 rotate-180" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full bg-neutral-950 p-3 rounded-md shadow-md border border-neutral-900"
      >
        <h2 className="text-2xl font-semibold mb-4 text-white">
          Seçilen Filmler
        </h2>
        <input
          type="text"
          placeholder="Liste adı girin"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          className="w-full mb-4 p-2 border rounded text-white bg-transparent border-neutral-800 outline-none"
        />
        <ul>
          {selectedMovies.map((movie, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-2 flex items-center justify-between text-white"
            >
              {movie.title}
              <button onClick={() => removeMovie(movie.title)}>
                <IoRemoveCircleOutline className="text-red-500 text-xl" />
              </button>
            </motion.li>
          ))}
        </ul>
        {selectedMovies.length === 3 && (
          <button
            onClick={finishSelection}
            className="px-4 w-full rounded-full border border-white/20 py-2 hover:border-green-500 text-green-500 hover:shadow-green-500 shadow-sm group-hover:opacity-100 hover:bg-gradient-to-t from-green-500/10 to-black/0 transition-all duration-700"
          >
            Seçimi Bitir
          </button>
        )}
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="flex gap-10"
      >
        <ul className="w-full grid grid-cols-4 gap-5 py-5">
          {movies.map((movie, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <img
                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                className="object-cover rounded-md shadow-md w-full"
                alt={movie.title}
              />
              <span className="text-white absolute top-5 left-5 text-sm px-4 py-1 ring-2 ring-red-500/30 rounded-full bg-black">
                {movie.title}
              </span>
              <button
                onClick={() =>
                  selectMovie({
                    title: movie.title,
                    image: movie.backdrop_path,
                  })
                }
                className="absolute top-3 right-3 text-2xl p-2 text-red-500 bg-black rounded-md"
                disabled={selectedMovies.some(
                  (selected) => selected.title === movie.title
                )}
              >
                <IoAddCircleOutline />
              </button>
            </motion.div>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default AddList;
