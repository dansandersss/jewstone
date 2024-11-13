"use client";

import { useState } from "react";
import { createUser } from "@/utils/appwrite";
import { useRouter } from "next/navigation";
import Image from "next/image";
import images from "@/constants/images";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await createUser(email, password, username);
      console.log("User created successfully:", user);
      router.push("/home/wallet");
    } catch (err) {
      setError("Ошибка регистрации. Попробуйте снова.");
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container bg-white flex md:justify-normal justify-center flex-col my-0 mx-auto w-full h-screen">
      <div className="flex flex-col items-center md:justify-normal justify-center">
        <Image
          className="bg-white mt-5 mb-[100px]"
          src={images.logo2}
          alt="Logo Registration"
          width={300}
        />
        <div className="flex justify-center items-center">
          <div className="md:w-[530px] sm:w-[330px] lg:w-[630px] p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
              Регистрация
            </h2>

            <form onSubmit={handleRegister}>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Имя пользователя
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Пароль
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
                />
              </div>

              {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 bg-customOrange text-white font-semibold shadow-md focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-300"
              >
                {loading ? "Загрузка..." : "Зарегистрироваться"}
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600">
              Уже есть аккаунт?{" "}
              <a
                href="/login"
                className="text-customOrange hover:text-orange-500 font-medium"
              >
                Войти
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
