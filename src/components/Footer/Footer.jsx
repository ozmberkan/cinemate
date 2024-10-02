import React from "react";
import Logo from "/logo.png";

import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="w-full  gap-5 text-white bg-transparent z-10">
      <div className="flex justify-between items-center p-5">
        <Link to="/" className="flex items-center gap-x-2">
          <img src={Logo} className="w-8" />
          <h1 className="font-changa text-2xl  text-white ">cinemate</h1>
        </Link>
        <div>
          <p>© 2024 Cinemate</p>
        </div>
      </div>
      <div className="grid grid-cols-4 h-full">
        <div className=" p-5 flex flex-col gap-y-5 items-start ">
          <Link className="text-xl text-zinc-400 hover:text-white">
            Hakkımızda
          </Link>
          <Link className="text-xl text-zinc-400 hover:text-white">
            İletişim
          </Link>
        </div>
        <div className=" p-5 flex flex-col gap-y-5 items-start ">
          <Link className="text-xl text-zinc-400 hover:text-white">
            Listeler
          </Link>
          <Link className="text-xl text-zinc-400 hover:text-white">
            Kullanıcılar
          </Link>
          <Link className="text-xl text-zinc-400 hover:text-white">
            Profilim
          </Link>
        </div>
        <div className=" p-5 flex flex-col gap-y-5 items-start ">
          <Link className="text-xl text-zinc-400 hover:text-white">
            Gizlilik Politikası
          </Link>
          <Link className="text-xl text-zinc-400 hover:text-white">
            Çerez Politikası
          </Link>
          <Link className="text-xl text-zinc-400 hover:text-white">
            Kişisel Verilerin Korunması
          </Link>
        </div>
        <div className=" p-5 flex flex-col gap-y-5 items-start ">
          <Link className="text-xl text-zinc-400 hover:text-white">
            X - Twitter
          </Link>
          <Link className="text-xl text-zinc-400 hover:text-white">
            Instagram
          </Link>
          <Link className="text-xl text-zinc-400 hover:text-white">
            Facebook
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
