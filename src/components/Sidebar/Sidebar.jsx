import { signOut } from "firebase/auth";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "~/firebase/firebase";
import { FaHome, FaUsers, FaUser } from "react-icons/fa";
import { IoExit } from "react-icons/io5";
import { RiPlayListAddFill } from "react-icons/ri";

const Sidebar = () => {
  const navigate = useNavigate();
  const exit = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      navigate("/login");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white border-r h-screen flex flex-col  justify-start items-center gap-y-5 p-5">
      <Link
        className="px-4 py-2 rounded-md bg-gradient-to-r from-[#F37E4F] to-[rgb(249,188,44)] text-white border ring-2 ring-offset-2 ring-yellow-500"
        to="/home"
      >
        <FaHome />
      </Link>
      <Link
        className="px-4 py-2 rounded-md bg-gradient-to-r from-[#F37E4F] to-[rgb(249,188,44)] text-white border ring-2 ring-offset-2 ring-yellow-500"
        to="/users"
      >
        <FaUsers />
      </Link>
      <Link
        className="px-4 py-2 rounded-md bg-gradient-to-r from-[#F37E4F] to-[rgb(249,188,44)] text-white border ring-2 ring-offset-2 ring-yellow-500"
        to="/add-list"
      >
        <RiPlayListAddFill />
      </Link>
      <Link
        className="px-4 py-2 rounded-md bg-gradient-to-r from-[#F37E4F] to-[rgb(249,188,44)] text-white border ring-2 ring-offset-2 ring-yellow-500"
        to="/profile"
      >
        <FaUser />
      </Link>
      <button
        className="px-4 py-2 rounded-md bg-gradient-to-r from-[#F37E4F] to-[rgb(249,188,44)] text-white border ring-2 ring-offset-2 ring-yellow-500"
        onClick={exit}
      >
        <IoExit />
      </button>
    </div>
  );
};

export default Sidebar;
