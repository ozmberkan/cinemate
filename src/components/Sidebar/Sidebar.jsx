import { signOut } from "firebase/auth";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "~/firebase/firebase";

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
    <div className="bg-red-500 h-screen flex flex-col">
      <Link to="/home">Home</Link>
      <Link to="/users">Kullanıcılar</Link>
      <button onClick={exit}>çıkış yap</button>
    </div>
  );
};

export default Sidebar;
