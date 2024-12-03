"use client";
import { useState } from "react";
import { useGlobalContext } from "@/context/GlobalProvider";
import Image from "next/image";
import ProfileInfo from "./ProfileInfo";
import { signOut, updateUserProfile, uploadAvatar } from "@/utils/appwrite";
import { useDropzone } from "react-dropzone";

export default function ProfileComp() {
  const { user, setUser } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: async (acceptedFiles) => handleFileDrop(acceptedFiles),
  });

  const handleFileDrop = async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;

    setLoading(true);
    setError(null);

    try {
      const avatarUrl = await uploadAvatar(acceptedFiles[0]);

      const updatedUser = await updateUserProfile(user.$id, {
        avatar: avatarUrl,
      });

      setUser(updatedUser);

      alert("Аватар успешно обновлён!");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/login");
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  return (
    <div className="container mb-[230px] md:mb-0 w-full h-full xl:h-[calc(100%-200px)]">
      <div className="xl:flex block xl:flex-col xl:justify-center justify-normal">
        <h1 className="text-customOrange text-[26px] font-bold mb-5 sm:text-center md:text-left">
          Личные данные
        </h1>

        <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-6 rounded-[10px] border p-5">
          <div className="flex items-center md:flex-col flex-col ">
            <div>
              {user?.avatar ? (
                <Image
                  src={user?.avatar}
                  width={220}
                  height={220}
                  className="rounded-full"
                  alt="Avatar"
                />
              ) : (
                <div className="w-[220px] h-[220px] bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-500">Без аватара</span>
                </div>
              )}
            </div>

            <div
              {...getRootProps()}
              className="mt-4 p-4 w-full flex flex-col gap-7 justify-center items-center"
            >
              <input {...getInputProps()} />
              <p className="text-customOrange underline cursor-pointer">
                Загрузить фото
              </p>
              <p
                onClick={handleSignOut}
                className="text-customGray opacity-70 underline cursor-pointer"
              >
                Выйти из профиля
              </p>
            </div>

            {loading && <p className="text-gray-500 mt-2">Загрузка...</p>}
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>

          <ProfileInfo />
        </div>
      </div>
    </div>
  );
}
