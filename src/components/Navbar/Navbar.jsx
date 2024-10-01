import { signOut } from "firebase/auth";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "~/firebase/firebase";
import { FaHome, FaUsers, FaUser } from "react-icons/fa";
import { IoAddCircle, IoExit } from "react-icons/io5";
import { RiPlayListAddFill } from "react-icons/ri";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);
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
    <div className=" w-full flex justify-between items-center gap-y-5 py-4 px-12 bg-transparent  ">
      <Link to="/" className="text-[40px] font-black text-white">
        cinemate.
      </Link>
      {user ? (
        <div className="flex gap-x-3">
          <Link
            to="/add-list"
            className="border font-semibold hover:bg-white hover:text-black transition-colors  text-white px-4 py-2 rounded-md flex justify-center items-center gap-x-2"
          >
            Liste Oluştur
            <IoAddCircle size={20} />
          </Link>
          <Link className="border font-semibold hover:bg-white hover:text-black transition-colors  text-white px-4 py-2 rounded-md">
            Profilim
          </Link>
          <Link className="border font-semibold hover:bg-white hover:text-black transition-colors  text-white px-4 py-2 rounded-md">
            Kullanıcılar
          </Link>
          <button
            onClick={exit}
            className="border font-semibold bg-white text-black transition-colors hover:text-zinc-700 px-4 py-2 rounded-md"
          >
            Çıkış yap
          </button>
        </div>
      ) : (
        <Link
          to="/login"
          className="border font-semibold hover:bg-white hover:text-black transition-colors  text-white px-4 py-2 rounded-md"
        >
          Oturum Aç
        </Link>
      )}
    </div>
  );
};

export default Navbar;
