import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getUserById } from "~/redux/slices/userSlice";
import { tailChase } from "ldrs";
import { Link } from "react-router-dom";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "~/firebase/firebase";

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
      <div className="w-full grid grid-cols-4 p-5 gap-5 py-32 h-screen bg-blue-500">
        {filteredUsers.map((otherUser) => (
          <div
            key={otherUser.uid}
            className="border border-neutral-600 flex flex-col p-5 gap-5 rounded-md bg-neutral-800"
          >
            <div className="w-full flex justify-between items-center">
              <span className="font-semibold text-white">
                @{otherUser.displayName}
              </span>
              <span className="text-white">
                Takip Sayısı: {otherUser.follows.length}
              </span>
              <span className="text-white">
                Takipçi Sayısı: {otherUser.followers.length}
              </span>
            </div>
            <div className="w-full justify-between flex items-center">
              {user.follows.some((f) => f.uid === otherUser.uid) ? (
                <div className="text-green-500">Takip ediyorsun</div>
              ) : (
                <button
                  onClick={() =>
                    followHandle({
                      username: otherUser.displayName,
                      uid: otherUser.uid,
                    })
                  }
                  className="px-4 py-2 rounded-md border bg-blue-500 text-white"
                >
                  Takip Et
                </button>
              )}

              <Link
                to={`/profile/${otherUser.uid}`}
                className="px-4 py-2 rounded-md bg-white"
              >
                Profiline Git
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default Users;
