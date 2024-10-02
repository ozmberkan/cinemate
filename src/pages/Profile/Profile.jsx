import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "~/firebase/firebase";
import { getUserById } from "~/redux/slices/userSlice";
import usersSvg from "/Users/UsersSvg.svg";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";

const Profile = () => {
  const { user } = useSelector((store) => store.user);
  const [isEditMode, setIsEditMode] = useState(false);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      displayName: user.displayName,
      email: user.email,
    },
  });

  // const deleteList = async (list) => {
  //   try {
  //     const userRef = doc(db, "users", user.uid);
  //     const listRef = doc(db, "lists", list.id);

  //     const deletedList = user.lists.filter(
  //       (item) => item.listName !== list.listName
  //     );

  //     await updateDoc(userRef, {
  //       lists: deletedList,
  //     });

  //     await deleteDoc(listRef);

  //     dispatch(getUserById(user.uid));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const changeProfile = async (data) => {
    try {
      const userRef = doc(db, "users", user.uid);

      await updateDoc(userRef, {
        displayName: data.displayName,
        email: data.email,
      });

      toast.success("Başarıyla profil güncellendi!");
      setIsEditMode(false);
      dispatch(getUserById(user.uid));
    } catch (error) {
      console.log(error);
    }
  };

  const sendNewPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Şifre sıfırlama bağlantısı gönderildi.");
    } catch (error) {
      console.log(error);
    }
  };

  const sendConfirmEmail = async () => {
    try {
      await sendEmailVerification(auth.currentUser);
      localStorage.removeItem("user");
      toast.success(
        "E-Posta doğrulama bağlantısı gönderildi. Yeniden giriş yapınız!"
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full py-32 h-screen flex justify-start items-start flex-col gap-y-3 ">
      <img src={usersSvg} className="absolute top-0 left-0 -z-10" />
      <div className="w-full flex justify-between items-center">
        <p className="text-5xl font-changa text-white w-full flex justify-start items-center">
          @{user.displayName}
        </p>
        <button
          onClick={() => setIsEditMode(!isEditMode)}
          type="button"
          className="px-4 py-2 rounded-full border border-white hover:bg-white hover:text-black transition-colors duration-500 bg-transparent text-white outline-none"
        >
          Düzenle
        </button>
      </div>
      <form
        className="w-full  rounded-md bg-neutral-950 p-5 flex gap-x-2 justify-between items-center"
        onSubmit={handleSubmit(changeProfile)}
      >
        <div className="flex gap-x-5">
          <input
            type="text"
            disabled={!isEditMode}
            {...register("displayName")}
            defaultValue={user.displayName}
            className="px-4 py-2 rounded-md border border-neutral-800 bg-transparent text-neutral-500 outline-none"
          />
          <input
            type="text"
            disabled={!isEditMode}
            {...register("email")}
            defaultValue={user.email}
            className="px-4 py-2 rounded-md border border-neutral-800 bg-transparent text-neutral-500 outline-none"
          />
          {isEditMode && (
            <button
              type="submit"
              className="px-4 py-2 rounded-full border border-white hover:bg-white hover:text-black transition-colors duration-500 bg-transparent text-white outline-none"
            >
              Kaydet
            </button>
          )}
        </div>
        <div className="flex gap-x-2">
          <button
            type="button"
            onClick={() => sendNewPassword(user.email)}
            className="px-4 py-2 rounded-md border border-neutral-800 bg-transparent text-neutral-500 outline-none"
          >
            Parolamı Değiştir!
          </button>
          {!user.emailVerified && (
            <button
              type="button"
              onClick={() => sendConfirmEmail(user.email)}
              className="px-4 py-2 rounded-md border border-neutral-800 bg-transparent text-neutral-500 outline-none"
            >
              E-Posta Doğrula!
            </button>
          )}
        </div>
      </form>
      {/* <div className="w-full grid grid-cols-4 gap-5 rounded-md">
        {user.lists.map((list, i) => (
          <div key={i} className="flex flex-col gap-y-2 border">
            <h1 className="text-center text-3xl font-bold">{list.listName}</h1>
            <button onClick={() => deleteList(list)}>sil</button>
            {list.movies.map((movie, i) => (
              <div key={i} className="text-white relative">
                <span className="absolute top-4 left-4 font-semibold text-2xl">
                  {movie.title}
                </span>
                <img
                  src={`https://image.tmdb.org/t/p/original/${movie.image}`}
                  className="w-full h-[200px] object-cover"
                />
              </div>
            ))}
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Profile;
