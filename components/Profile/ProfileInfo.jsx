"use client";

import { useState, useEffect } from "react";
import { useGlobalContext } from "@/context/GlobalProvider";
import {
  updateUserProfile,
  getUserProfile,
  getCurrentUser,
  updatePassword,
} from "@/utils/appwrite";

export default function ProfileInfo() {
  const { user, setUser } = useGlobalContext();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isClient, setIsClient] = useState(false);

  const fetchUserProfile = async () => {
    try {
      const userProfile = await getCurrentUser(user?.$id);
      if (userProfile) {
        setName(userProfile.name);
        setLastName(userProfile.last_name || userProfile.lastName);
        setEmail(userProfile.email);
        setUsername(userProfile.username);
      }
      console.log(userProfile.name);
    } catch (error) {
      console.error("Ошибка при загрузке данных профиля:", error);
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && user?.$id) {
      fetchUserProfile();
    }
  }, [isClient, user?.$id, fetchUserProfile]);

  const handleSaveChanges = async () => {
    try {
      if (newPassword && newPassword !== confirmNewPassword) {
        throw new Error("Пароли не совпадают");
      }

      const updatedData = {
        name,
        last_name: lastName,
        email,
        username,
      };

      const updatedUser = await updateUserProfile(user.$id, updatedData);

      if (newPassword) {
        await updatePassword(oldPassword, newPassword);
      }

      setName(updatedUser.name);
      setLastName(updatedUser.last_name || updatedUser.lastName);
      setEmail(updatedUser.email);
      setUsername(updatedUser.username);

      setUser(updatedUser);

      fetchUserProfile();

      alert("Данные успешно обновлены!");
    } catch (error) {
      console.error("Ошибка обновления данных:", error.message);
      alert("Ошибка при обновлении данных: " + error.message);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col xl:flex-row items-center gap-3">
          <input
            className="rounded-[10px] w-[300px] xl:w-[389px] py-[23px] pl-[20px] bg-customWhite"
            type="text"
            value={name}
            placeholder="Имя"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="rounded-[10px] w-[300px] xl:w-[389px] py-[23px] pl-[20px] bg-customWhite"
            type="text"
            value={lastName}
            placeholder="Фамилия"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="flex flex-col xl:flex-row items-center gap-3">
          <input
            type="text"
            className="rounded-[10px] w-[300px] xl:w-[389px] py-[23px] pl-[20px] bg-customWhite"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            className="rounded-[10px] w-[300px] xl:w-[389px] py-[23px] pl-[20px] bg-customWhite"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col xl:flex-row items-center gap-3">
          <input
            className="rounded-[10px] w-[300px] xl:w-[389px] py-[23px] pl-[20px] bg-customWhite"
            type="password"
            placeholder="Старый пароль"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <input
            className="rounded-[10px] w-[300px] xl:w-[389px] py-[23px] pl-[20px] bg-customWhite"
            type="password"
            placeholder="Новый пароль"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col xl:flex-row items-center gap-3">
          <input
            className="rounded-[10px] w-[300px] xl:w-[389px] py-[23px] pl-[20px] bg-customWhite"
            type="password"
            placeholder="Подтвердите новый пароль"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
          <button
            className="bg-customGray py-[23px] px-[20px] rounded-[10px] text-white w-[300px] xl:w-[389px] hover:-translate-y-1 transition ease-in duration-150"
            onClick={handleSaveChanges}
          >
            Сохранить изменения
          </button>
        </div>
      </div>
    </div>
  );
}
