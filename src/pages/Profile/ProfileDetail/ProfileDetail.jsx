import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import usersSvg from "/Users/UsersSvg.svg";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "~/firebase/firebase";
import {
  getAllUsers,
  getUserById,
  getUserDetailById,
} from "~/redux/slices/userSlice";
import { motion } from "framer-motion";

const ProfileDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { detailedUser, user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserDetailById(id));
  }, []);

  const leaveFollow = async (detailedUser) => {
    const userRef = doc(db, "users", user.uid);
    const otherUserRef = doc(db, "users", detailedUser.uid);

    try {
      await updateDoc(userRef, {
        follows: arrayRemove({
          username: detailedUser.displayName,
          uid: detailedUser.uid,
        }),
      });

      await updateDoc(otherUserRef, {
        followers: arrayRemove({ username: user.displayName, uid: user.uid }),
      });

      dispatch(getAllUsers());
      dispatch(getUserById(user.uid));

      navigate("/users");
    } catch (error) {
      console.error("Error updating follow data: ", error);
    }
  };

  console.log(detailedUser);

  return (
    <div className="text-white py-32 h-screen flex justify-start items-start flex-col ">
      <img src={usersSvg} className="absolute top-0 left-0 -z-10" />
      <div className="w-full flex justify-between items-center border-b py-5 border-neutral-700">
        <div className="px-7 py-2 rounded-full border">
          <span className="text-2xl">@{detailedUser?.displayName}</span>
        </div>
        <div className="flex gap-x-5 items-center">
          <span className="px-4 py-2 rounded-md border bg-neutral-950 border-neutral-800">
            Takip : {detailedUser?.follows?.length}
          </span>
          <span className="px-4 py-2 rounded-md border bg-neutral-950 border-neutral-800">
            Takipçi : {detailedUser?.followers?.length}
          </span>
        </div>
        <div className="">
          {detailedUser?.followers?.some(
            (follower) => follower.uid === user.uid
          ) ? (
            <button
              onClick={() => leaveFollow(detailedUser)}
              className="px-4 w-full rounded-full border border-white/20 py-2 hover:border-red-500 text-red-500 hover:shadow-red-500 shadow-sm group-hover:opacity-100 hover:bg-gradient-to-t from-green-500/10 to-black/0 transition-all duration-700"
            >
              Takipten çık
            </button>
          ) : null}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-5 w-full mt-5 ">
        {detailedUser?.lists?.map((list, index) => (
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
              <div className="flex justify-between items-center w-full gap-x-5 ">
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
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProfileDetail;
