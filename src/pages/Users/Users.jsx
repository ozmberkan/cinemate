import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "~/redux/slices/userSlice";
import { tailChase } from "ldrs";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "~/firebase/firebase";

const Users = () => {
  const dispatch = useDispatch();
  tailChase.register();

  const { user, users, isLoading, isSuccess } = useSelector(
    (store) => store.user
  );

  const followHandle = async ({ username, uid }) => {
    try {
      const data = { username, uid };

      const userRef = doc(db, "users", user.uid);
      const storedUser = JSON.parse(localStorage.getItem("user"));

      const alreadyFriend = storedUser?.friends?.some(
        (friend) => friend.uid === uid
      );

      if (alreadyFriend) {
        console.log("Kullanıcı zaten arkadaş listenizde.");
        return;
      }

      await updateDoc(userRef, {
        friends: arrayUnion(data),
      });

      storedUser.friends = [...(storedUser.friends || []), data];
      localStorage.setItem("user", JSON.stringify(storedUser));

      dispatch(getAllUsers());
    } catch (error) {
      console.log("Error updating friends: ", error);
    }
  };

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

  if (isSuccess) {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    return (
      <div className="w-full grid grid-cols-4 p-5 gap-5">
        {users.map((user) => {
          if (!loggedInUser || loggedInUser.uid === user.uid) {
            return null;
          }

          const isFollowing =
            loggedInUser.friends &&
            loggedInUser.friends.some((friend) => friend.uid === user.uid);

          return (
            <div
              key={user.uid}
              className="border flex flex-col p-5 rounded-md bg-white"
            >
              <div className="w-full flex justify-between items-center">
                <span className="font-semibold">@{user.displayName}</span>
                <span>Takip Sayısı: {user.friends.length}</span>
              </div>
              {isFollowing ? (
                <span className="text-green-500">Takip Ediyorsun</span>
              ) : (
                <button
                  onClick={() =>
                    followHandle({ username: user.displayName, uid: user.uid })
                  }
                  className="px-4 py-2 rounded-md border bg-blue-500 text-white"
                >
                  Takip Et
                </button>
              )}
            </div>
          );
        })}
      </div>
    );
  }
};

export default Users;
