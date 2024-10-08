import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "~/firebase/firebase";
import { useSelector } from "react-redux";
import Logo from "/logo.png";
import { navTabs } from "~/data/data";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();

  const { user } = useSelector((store) => store.user);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const exit = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      window.location.reload();
      toast.success("Başarıyla çıkış yapıyorsunuz.");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`fixed container top-0 z-20 px-5 border-transparent border transition-all duration-500 rounded-full  ${
        isScrolled ? "bg-black/90 top-5 border" : ""
      } `}
    >
      <div className="w-full  py-6 flex justify-between items-center sm:px-0 px-6 ">
        <Link to="/" className="flex gap-x-2">
          <img src={Logo} className="w-8" />
          <h1 className="font-changa text-2xl  text-white ">cinemate</h1>
        </Link>
        {user ? (
          <div className="text-white flex items-center gap-x-3 ">
            {navTabs.map((tab) => (
              <Link
                key={tab.id}
                to={tab.to}
                className="px-4 flex items-center  gap-x-2 rounded-full border border-white/20 py-2 hover:border-white  group-hover:opacity-100 hover:shadow-white-500 shadow-sm  hover:bg-gradient-to-t from-white/10 to-black/0 transition-all duration-1000"
              >
                {tab.label}
                {tab.icon && <tab.icon size={20} className="text-red-500" />}
              </Link>
            ))}

            <button
              onClick={exit}
              className="px-4 rounded-full border border-white/20 py-2 hover:border-red-500 hover:text-red-500 hover:shadow-red-500 shadow-sm   group-hover:opacity-100 hover:bg-gradient-to-t from-red-500/10 to-black/0 transition-all duration-700"
            >
              Çıkış Yap
            </button>
            {user?.photoURL ? (
              <Link to="/profile" className=" w-10 h-10   border-neutral-600">
                <img src={user?.photoURL} className="rounded-md" />
              </Link>
            ) : (
              <Link
                to="/profile"
                className="px-4 flex items-center  gap-x-2 rounded-full border border-white/20 py-2 hover:border-white  group-hover:opacity-100 hover:shadow-white-500 shadow-sm  hover:bg-gradient-to-t from-white/10 to-black/0 transition-all duration-1000"
              >
                Profilim
              </Link>
            )}
          </div>
        ) : (
          <div className="text-white flex items-center gap-x-3 ">
            <Link
              to="/login"
              className="px-4 rounded-full border border-white/20 py-2 hover:border-green-500 hover:text-green-500 hover:shadow-green-500 shadow-sm  group-hover:opacity-100 hover:bg-gradient-to-t from-green-500/10 to-black/0 transition-all duration-700"
            >
              Oturum Aç
            </Link>
          </div>
        )}
      </div>
      <div className="w-full h-px bg-gradient-to-r from-white/0 via-white/60 to-white/0 " />
    </div>
  );
};

export default Navbar;
