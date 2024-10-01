import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { registerScheme } from "~/validation/scheme";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { registerService } from "~/redux/slices/userSlice";
import Logo from "../../assets/logo.png";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess, isError } = useSelector((store) => store.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerScheme),
  });

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
    if (isError) {
      console.log("Hata var!");
    }
  }, [isSuccess, isError, navigate]);

  const registerHandle = (data) => {
    try {
      dispatch(registerService(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen flex-col bg-bg bg-center bg-no-repeat bg-cover">
      {/* <img src={Logo} /> */}
      <div className="bg-neutral-900 rounded-md border border-zinc-800 p-5 w-[500px]">
        <div className="flex flex-col gap-y-2">
          <h1 className="font-medium text-3xl text-white">Kayıt Ol</h1>
          <p className="text-zinc-400 text-sm">
            Cinemate hesabınız yok mu? Hemen kayıt olun ve en sevdiğiniz
            filmleri keşfedin ve arkadaşlarınızla paylaşın.
          </p>
        </div>
        <form
          className="w-full h-full mt-3 flex flex-col gap-y-3"
          onSubmit={handleSubmit(registerHandle)}
        >
          <div className="flex flex-col gap-y-1">
            <label className="text-sm text-zinc-600">Kullanıcı Adı</label>
            <input
              type="text"
              placeholder="Kullanıcı Adı giriniz..."
              {...register("username")}
              className={`w-full px-4 py-2 text-white rounded-md border outline-none focus:ring-2 ring-offset-1 bg-transparent border-zinc-800 ring-zinc-600 ring-offset-transparent ${
                errors.username && "ring-red-500"
              } transition-all`}
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <label className="text-sm text-zinc-600">E-Posta</label>
            <input
              type="text"
              placeholder="E-Posta giriniz..."
              {...register("email")}
              className={`w-full px-4 py-2 text-white rounded-md border outline-none focus:ring-2 ring-offset-1 bg-transparent border-zinc-800 ring-zinc-600 ring-offset-transparent ${
                errors.username && "ring-red-500"
              } transition-all`}
            />
          </div>

          <div className="flex flex-col gap-y-1">
            <label className="text-sm text-zinc-600">Parola</label>
            <input
              type="password"
              placeholder="Parola giriniz..."
              {...register("password")}
              className={`w-full px-4 py-2 text-white rounded-md border outline-none focus:ring-2 ring-offset-1 bg-transparent border-zinc-800 ring-zinc-600 ring-offset-transparent ${
                errors.username && "ring-red-500"
              } transition-all`}
            />
          </div>
          <button
            type="submit"
            className="px-4 mt-3 font-medium py-2 rounded-md bg-gradient-to-r from-[#F37E4F] to-[rgb(249,188,44)] text-white "
          >
            Kayıt Ol
          </button>
          <Link to="/login" className="text-sm hover:underline text-zinc-300">
            Zaten bir hesabın var mı ?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
