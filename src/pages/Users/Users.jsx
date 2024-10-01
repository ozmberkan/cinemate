import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "~/redux/slices/userSlice";
import { tailChase } from "ldrs";
import { Link } from "react-router-dom";

const Users = () => {
  const dispatch = useDispatch();
  tailChase.register();

  const { users, isLoading, isSuccess } = useSelector((store) => store.user);

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
    return (
      <div className="w-full grid grid-cols-4 p-5 gap-5">
        {users.map((user) => {
          return (
            <div
              key={user.uid}
              className="border border-neutral-600 flex flex-col p-5 gap-5 rounded-md bg-neutral-800 "
            >
              <div className="w-full flex justify-between items-center">
                <span className="font-semibold text-white">
                  @{user.displayName}
                </span>
                <span className="text-white">
                  Takip Sayısı: {user.friends.length}
                </span>
              </div>
              <div className="w-full justify-between flex items-center">
                <button
                  onClick={() =>
                    followHandle({
                      username: user.displayName,
                      uid: user.uid,
                    })
                  }
                  className="px-4 py-2 rounded-md border bg-blue-500 text-white"
                >
                  Takip Et
                </button>

                <Link
                  to={`/profile/${user.uid}`}
                  className="px-4 py-2 rounded-md bg-white "
                >
                  Profiline Git
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
};

export default Users;
