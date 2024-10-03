import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "~/firebase/firebase";
import { getUserById } from "~/redux/slices/userSlice";
import usersSvg from "/Users/UsersSvg.svg";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { motion } from "framer-motion";

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

  const deleteList = async (list) => {
    try {
      const userRef = doc(db, "users", user.uid);
      const listRef = doc(db, "lists", list.id);

      const deletedList = user.lists.filter(
        (item) => item.listName !== list.listName
      );

      await updateDoc(userRef, {
        lists: deletedList,
      });

      await deleteDoc(listRef);

      dispatch(getUserById(user.uid));
      toast.success("Başarıyla Liste Silindi.");
    } catch (error) {
      console.log(error);
    }
  };

  const changeProfile = async (data) => {
    try {
      const userRef = doc(db, "users", user.uid);

      await updateDoc(userRef, {
        displayName: data.displayName,
        email: data.email,
        photoURL: data.photoURL,
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
    <div className="w-full py-32 flex justify-start items-start flex-col gap-y-3 ">
      <img src={usersSvg} className="absolute top-0 left-0 -z-10" />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full flex justify-between items-center mb-4"
      >
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
      </motion.div>
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="w-full rounded-md bg-neutral-950 p-4 flex gap-x-2 justify-between items-center border border-neutral-800"
        onSubmit={handleSubmit(changeProfile)}
      >
        <div className="flex gap-x-5">
          <input
            type="text"
            disabled={!isEditMode}
            {...register("displayName")}
            defaultValue={user.displayName}
            className="px-4 py-2 rounded-md border border-neutral-700 bg-transparent text-neutral-500 outline-none"
          />
          <input
            type="text"
            disabled={!isEditMode}
            {...register("email")}
            defaultValue={user.email}
            className="px-4 py-2 rounded-md border border-neutral-700 bg-transparent text-neutral-500 outline-none"
          />
          <input
            type="text"
            disabled={!isEditMode}
            placeholder="Kullanıcı Görseli (Link)"
            {...register("photoURL")}
            className="px-4 py-2 rounded-md border placeholder:text-neutral-500 border-neutral-700 bg-transparent text-neutral-500 outline-none"
          />
          {isEditMode && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-4 py-2 rounded-full border border-white hover:bg-white hover:text-black transition-colors duration-500 bg-transparent text-white outline-none"
            >
              Kaydet
            </motion.button>
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
      </motion.form>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="w-full flex justify-start items-center text-4xl text-white mb-2"
      >
        Listelerim
      </motion.h1>
      {user.lists.length > 0 ? (
        user.lists.map((list, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 * i, duration: 0.5 }}
            className="w-full grid grid-cols-1 gap-5"
          >
            <div className="flex flex-col border border-neutral-700 gap-y-4 p-4 rounded-md bg-neutral-950">
              <h1 className="text-center text-3xl font-bold text-white">
                {list.listName}
              </h1>
              {list.movies.map((movie, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 * i, duration: 0.5 }}
                  className="flex flex-col gap-y-4 relative"
                >
                  <span className="text-white absolute top-5 left-5 text-sm px-4 py-1 ring-2 ring-red-500/30 rounded-full bg-black">
                    {movie.title}
                  </span>
                  <img
                    src={`https://image.tmdb.org/t/p/original/${movie.image}`}
                    className="w-full h-[200px] object-cover rounded-md mb-2"
                    alt={movie.title}
                  />
                </motion.div>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => deleteList(list)}
                className="px-4 rounded-full border border-white/20 py-2 hover:border-red-500 text-red-500 hover:shadow-red-500 shadow-sm  group-hover:opacity-100 hover:bg-gradient-to-t from-red-500/10 to-black/0 transition-all duration-700"
              >
                Sil
              </motion.button>
            </div>
          </motion.div>
        ))
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full bg-neutral-950 px-4 py-2 rounded-md text-neutral-600 border border-neutral-800"
        >
          Henüz herhangi bir liste eklemedin, hemen yeni bir liste oluştur!
        </motion.div>
      )}
    </div>
  );
};

export default Profile;
