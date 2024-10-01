import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import { getUserById } from "~/redux/slices/userSlice";
const ProfileDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { detailedUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserById(id));
  }, []);

  return (
    <div className="text-white">
      {detailedUser?.displayName} - {id}
    </div>
  );
};

export default ProfileDetail;
