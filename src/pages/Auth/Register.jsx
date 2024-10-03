import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { registerScheme } from "~/validation/scheme";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { registerService } from "~/redux/slices/userSlice";
import RegisterSvg from "/Register/register.svg";
import toast, { Toaster } from "react-hot-toast";

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

  if (isSuccess) {
    toast.success("Başarıyla kayıt oldunuz! İyi eğlenceler");
  }

  return (
    <>
      <Toaster
        toastOptions={{
          className: "",
          duration: 1500,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
      <div className="flex justify-center items-center sm:h-screen sm:p-0 p-5">
        <div className="sm:w-[55%] hidden h-full relative sm:flex justify-center items-center">
          <div className="z-20 absolute">
            <h1 className="text-white text-[80px] font-black">cinemate</h1>
            <p className="text-white text-lg">
              Cinemate hesabınız yok mu? Hemen kayıt olun ve en sevdiğiniz
              filmleri keşfedin ve arkadaşlarınızla paylaşın!
            </p>
          </div>
          <img
            src={RegisterSvg}
            className="w-full h-full object-cover absolute opacity-50"
          />
        </div>
        <div className="sm:w-[45%] w-full flex justify-center items-center h-full">
          <div className="bg-neutral-900 rounded-md border border-zinc-800 p-5 w-[500px] relative drop-shadow-3xl ">
            <div className="flex flex-col gap-y-2">
              <h1 className="font-medium text-3xl text-white">Kayıt Ol</h1>
              <p className="text-zinc-400 text-sm">
                Cinemate hesabınız yok mu? Hemen giriş yapın ve en sevdiğiniz
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
                className="px-4 rounded-md border text-white border-white/20 py-2 hover:border-white  group-hover:opacity-100 hover:shadow-white-500 shadow-sm  hover:bg-gradient-to-t from-white/10 to-black/0 transition-all duration-1000"
              >
                Kayıt Ol
              </button>
              <Link
                to="/login"
                className="text-sm hover:underline text-zinc-300"
              >
                Hesabın var mı ?
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
