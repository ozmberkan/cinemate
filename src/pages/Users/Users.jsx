import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getUserById } from "~/redux/slices/userSlice";
import { tailChase } from "ldrs";
import { Link } from "react-router-dom";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "~/firebase/firebase";
import avatar from "/avatar.png";
import usersSvg from "/Users/UsersSvg.svg";

const Users = () => {
  const dispatch = useDispatch();
  tailChase.register();

  const { user, users, isLoading, isSuccess } = useSelector(
    (store) => store.user
  );

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="w-full h-screen items-center flex justify-center">
        <l-tail-chase size="40" speed="1.75" color="#F37E4F"></l-tail-chase>
      </div>
    );
  }

  const followHandle = async (data) => {
    const userRef = doc(db, "users", user.uid);
    const otherUserRef = doc(db, "users", data.uid);

    try {
      await updateDoc(userRef, {
        follows: arrayUnion({
          username: data.username,
          uid: data.uid,
        }),
      });

      await updateDoc(otherUserRef, {
        followers: arrayUnion({ username: user.displayName, uid: user.uid }),
      });

      dispatch(getAllUsers());
      dispatch(getUserById(user.uid));
    } catch (error) {
      console.error("Error updating follow data: ", error);
    }
  };

  const filteredUsers = users.filter((u) => u.uid !== user.uid);

  if (isSuccess) {
    return (
      <div className="w-full py-32 h-screen flex flex-col gap-y-5 ">
        <img src={usersSvg} className="absolute top-0 left-0 -z-10" />
        <div className="w-full flex justify-between items-center">
          <h1 className="text-5xl font-semibold text-white">
            Kullanıcı Listesi
          </h1>
          <p className="text-white text-4xl px-12 py-1 rounded-md border">
            <span>{users?.length - 1}</span>
          </p>
        </div>
        <div className="grid grid-cols-4 gap-5">
          {filteredUsers.map((otherUser) => (
            <div
              key={otherUser.uid}
              className="flex flex-col p-5 gap-5 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30 border border-zinc-700
               hover:border-zinc-500
"
            >
              <div className="w-full flex items-center gap-x-2 justify-between">
                <Link
                  to={`/profile/${otherUser.uid}`}
                  className="flex gap-x-3 items-center"
                >
                  <img
                    src={avatar}
                    className="w-10 rounded-full ring-2 ring-offset-black ring-offset-2 ring-white/25"
                  />
                  <span className="font-semibold text-white">
                    @{otherUser.displayName}
                  </span>
                </Link>
              </div>
              <div className="w-full justify-between flex items-center">
                {user.follows.some((f) => f.uid === otherUser.uid) ? (
                  <span className="flex w-full h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                    Takip ediyorsun
                  </span>
                ) : (
                  <button
                    onClick={() =>
                      followHandle({
                        username: otherUser.displayName,
                        uid: otherUser.uid,
                      })
                    }
                    className="px-8 py-2 w-full hover:ring-2 ring-offset-black ring-offset-2 ring-[#FF2323] rounded-md bg-gradient-to-b from-[#FF2323] to-[#b81818] text-white focus:ring-2 focus:ring-red-400 hover:shadow-xl transition duration-200"
                  >
                    Takip Et
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default Users;
