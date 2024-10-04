import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLists } from "~/redux/slices/listsSlice";
import usersSvg from "/Users/UsersSvg.svg";
import { motion } from "framer-motion";
import { tailChase } from "ldrs";
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "~/firebase/firebase";
import toast from "react-hot-toast";
import { getUserById } from "~/redux/slices/userSlice";

const AllList = () => {
  const dispatch = useDispatch();
  const { lists, isLoading } = useSelector((store) => store.lists);
  const { user } = useSelector((store) => store.user);
  tailChase.register();
  useEffect(() => {
    dispatch(getAllLists());
  }, [dispatch]);

  // if (isLoading) {
  //   return (
  //     <div className="w-full h-screen items-center flex justify-center">
  //       <l-tail-chase size="40" speed="1.75" color="#B81314"></l-tail-chase>
  //     </div>
  //   );
  // }

  const addToFavorites = async (list) => {
    try {
      const userRef = doc(db, "users", user.uid);

      await updateDoc(userRef, {
        favorites: arrayUnion(list),
      });
      toast.success("Liste başarıyla favorilere eklendi.");
      dispatch(getUserById(user.uid));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen p-5 flex flex-grow gap-y-5 justify-start items-start relative py-32">
      <img src={usersSvg} className="absolute top-0 left-0 -z-10" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-4 w-full gap-5"
      >
        {lists.map((list, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * index, duration: 0.5 }}
            className="border flex justify-center items-center flex-col text-center p-4 rounded-xl bg-neutral-950 border-neutral-700"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-white flex flex-col w-full"
            >
              <div className="flex justify-between items-center w-full ">
                <span className="text-sm">@{list.creater}</span>
                <span className="px-4 py-1 rounded-full text-neutral-600 bg-neutral-950 border border-neutral-600">
                  {list.createdAt}
                </span>
              </div>
              <div className="flex justify-start items-center py-2 w-full">
                <span className="text-2xl">{list.listName}</span>
              </div>
            </motion.div>
            {list.movies.map((movie, movieIndex) => (
              <motion.div
                key={movieIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * movieIndex, duration: 0.5 }}
                className="flex flex-col gap-y-5 relative"
              >
                <img
                  src={`https://image.tmdb.org/t/p/original/${movie.image}`}
                  className="w-full rounded-md object-cover mb-5"
                  alt={movie.title}
                />
                <span className="text-white absolute top-5 left-5 text-sm px-4 py-1 ring-2 ring-red-500/30 rounded-full bg-black">
                  {movie.title}
                </span>
              </motion.div>
            ))}
            <button
              onClick={() => addToFavorites(list)}
              className="px-4 w-full rounded-full border border-white/20 py-2 hover:border-green-500 text-green-500 hover:shadow-green-500 shadow-sm  group-hover:opacity-100 hover:bg-gradient-to-t from-green-500/10 to-black/0 transition-all duration-700"
            >
              Favorilere Ekle
            </button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AllList;
