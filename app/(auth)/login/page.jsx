"use client";

import { useState } from "react";
import { signIn, createPasswordRecovery } from "@/utils/appwrite"; // импортируем функцию для восстановления пароля
import { useRouter } from "next/navigation";
import images from "@/constants/images";
import Image from "next/image";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const session = await signIn(email, password);
      console.log("User logged in successfully:", session);
      router.push("/home/wallet");
    } catch (err) {
      setError("Ошибка входа. Попробуйте снова.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordRecovery = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createPasswordRecovery(recoveryEmail);
      alert(
        "Инструкции по восстановлению пароля были отправлены на ваш email."
      );
      setForgotPassword(false);
    } catch (err) {
      setError("Ошибка восстановления пароля. Попробуйте снова.");
      console.error("Password recovery error:", err);
    }
  };

  return (
    <div className="container bg-white flex md:justify-normal flex-col my-0 mx-auto w-full h-screen">
      <div className="flex flex-col items-center w-full">
        <Image
          className="bg-white mt-5 mb-[100px]"
          src={images.logo2}
          alt="Logo Registration"
          width={300}
        />
        <div className="flex justify-center items-center">
          <div className="md:w-[530px] sm:w-[330px] lg:w-[630px] p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
              Авторизация
            </h2>

            {/* Если форма восстановления пароля активна */}
            {forgotPassword ? (
              <form onSubmit={handlePasswordRecovery}>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Введите ваш email для восстановления пароля
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={recoveryEmail}
                    onChange={(e) => setRecoveryEmail(e.target.value)}
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
                  {loading ? "Загрузка..." : "Отправить инструкции"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleLogin}>
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

                <div className="mb-4 relative">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Пароль
                  </label>
                  <div>
                    <input
                      id="password"
                      type={passwordVisible ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
                    />
                    <button
                      type="button"
                      onClick={() => setPasswordVisible((prev) => !prev)}
                      className="absolute right-3 top-8 text-gray-600"
                    >
                      {passwordVisible ? "Скрыть" : "Показать"}
                    </button>
                  </div>
                </div>

                {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 px-4 bg-customOrange text-white font-semibold shadow-md focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-300"
                >
                  {loading ? "Загрузка..." : "Войти"}
                </button>
              </form>
            )}

            {/* Ссылка на восстановление пароля */}
            {!forgotPassword && (
              <p className="mt-4 text-center text-sm text-gray-600">
                Забыли пароль?{" "}
                <button
                  onClick={() => setForgotPassword(true)}
                  className="text-customOrange hover:text-orange-500 font-medium"
                >
                  Восстановить
                </button>
              </p>
            )}

            {/* Ссылка на регистрацию */}
            <p className="mt-4 text-center text-sm text-gray-600">
              Нет аккаунта?{" "}
              <a
                href="/register"
                className="text-customOrange hover:text-orange-500 font-medium"
              >
                Зарегистрироваться
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
