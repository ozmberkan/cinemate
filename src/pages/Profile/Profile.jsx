import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { db } from "~/firebase/firebase";
import { getUserById } from "~/redux/slices/userSlice";

const Profile = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const deleteList = async (list) => {
    try {
      const userRef = doc(db, "users", user.uid);

      const deletedList = user.lists.filter(
        (item) => item.listName !== list.listName
      );

      await updateDoc(userRef, {
        lists: deletedList,
      });

      dispatch(getUserById(user.uid));
    } catch (error) {
      console.log(hata);
    }
  };

  return (
    <div className="text-white px-12 w-full py-32 h-screen bg-blue-500">
      <span>{user.displayName}</span>
      <span>
        {user.follows.map((follows) => (
          <Link key={follows.uid} to={`/profile/${follows.uid}`}>
            {follows.username}
          </Link>
        ))}
      </span>
      <div className="w-full grid grid-cols-4 gap-5 rounded-md">
        {user.lists.map((list, i) => (
          <div key={i} className="flex flex-col gap-y-2 border">
            <h1 className="text-center text-3xl font-bold">{list.listName}</h1>
            <button onClick={() => deleteList(list)}>sil</button>
            {list.movies.map((movie, i) => (
              <div key={i} className="text-white relative">
                <span className="absolute top-4 left-4 font-semibold text-2xl">
                  {movie.title}
                </span>
                <img
                  src={`https://image.tmdb.org/t/p/original/${movie.image}`}
                  className="w-full h-[200px] object-cover"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
