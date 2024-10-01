import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import { getUserDetailById } from "~/redux/slices/userSlice";
const ProfileDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { detailedUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserDetailById(id));
  }, []);

  return (
    <div className="text-white">
      {detailedUser?.displayName} - {id}
    </div>
  );
};

export default ProfileDetail;
