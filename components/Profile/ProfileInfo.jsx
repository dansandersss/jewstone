"use client";

import { useState, useEffect } from "react";
import { useGlobalContext } from "@/context/GlobalProvider";
import { updateUserProfile, getUserProfile } from "@/utils/appwrite";

export default function ProfileInfo() {
  const { user, setUser } = useGlobalContext();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // Функция для загрузки профиля пользователя
  const fetchUserProfile = async () => {
    try {
      const userProfile = await getUserProfile(user?.$id);
      if (userProfile) {
        setName(userProfile.name); // Устанавливаем актуальные данные
        setLastName(userProfile.last_name || userProfile.lastName);
        setEmail(userProfile.email);
      }
    } catch (error) {
      console.error("Ошибка при загрузке данных профиля:", error);
    }
  };

  useEffect(() => {
    if (user?.$id) {
      fetchUserProfile();
    }
  }, [user]); // Загружаем данные при изменении user

  const handleSaveChanges = async () => {
    try {
      // Проверка совпадения паролей
      if (newPassword && newPassword !== confirmNewPassword) {
        throw new Error("Пароли не совпадают");
      }

      // Обновляем данные пользователя (имя, фамилию, email)
      const updatedData = {
        name,
        last_name: lastName,
        email,
      };

      // Обновляем информацию профиля в базе данных
      const updatedUser = await updateUserProfile(user.$id, updatedData);

      // Если был введен новый пароль, обновляем его
      if (newPassword) {
        await updatePassword(oldPassword, newPassword);
      }

      // Обновляем локальные значения состояния с актуальными данными
      setName(updatedUser.name);
      setLastName(updatedUser.last_name || updatedUser.lastName);
      setEmail(updatedUser.email);

      // Обновляем данные в контексте
      setUser(updatedUser);

      // После обновления, заново загружаем данные профиля с сервера
      fetchUserProfile();

      alert("Данные успешно обновлены!");
    } catch (error) {
      console.error("Ошибка обновления данных:", error.message);
      alert("Ошибка при обновлении данных: " + error.message);
    }
  };

  return (
    <div className="container">
      <div className="flex">
        <input
          type="text"
          value={name} // Передаем актуальные данные из состояния
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={lastName} // Передаем актуальные данные из состояния
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          className="w-full"
          value={email} // Передаем актуальные данные из состояния
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Старый пароль"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Новый пароль"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Подтвердите новый пароль"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
        <button className="bg-customGray" onClick={handleSaveChanges}>
          Сохранить изменения
        </button>
      </div>
    </div>
  );
}
