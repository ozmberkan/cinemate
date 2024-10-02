import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";
import { db } from "~/firebase/firebase";
import {
  getAllUsers,
  getUserById,
  getUserDetailById,
} from "~/redux/slices/userSlice";
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

  return (
    <div className="text-white py-32 h-screen bg-blue-500">
      {detailedUser?.displayName} - {id}
      <button
        onClick={() => leaveFollow(detailedUser)}
        className="px-4 py-2 rounded-md bg-white text-black font-semibold"
      >
        Takipten çık
      </button>
    </div>
  );
};

export default ProfileDetail;
