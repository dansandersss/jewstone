"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "@/utils/appwrite";

import logo from "@/constants/images";
import { links } from "@/constants/navLinks"; // Import links
import images from "@/constants/images";
import icons from "@/constants/icons";
// import Footer from "../Footer/Footer";

const Sidebar = () => {
  const [showProfileLinks, setShowProfileLinks] = useState(false);
  const [openBurgerMenu, setOpenBurgerMenu] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [toggleIcon, setToggleIcon] = useState(icons.menuIcon);

  const toggleProfileLinks = () => {
    setShowProfileLinks((prev) => !prev);
  };

  useEffect(() => {
    // Загрузить уведомления только при первой необходимости
    if (showNotifications && !isLoaded) {
      fetchNotifications();
    }
  }, [showNotifications]);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/login");
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  const handleLinkClick = (linkText) => {
    if (linkText !== "Денежные средства" && linkText !== "Личные данные") {
      setShowProfileLinks(false);
    }
  };

  const fetchNotifications = async () => {
    try {
      const userId = "user_id_placeholder"; // Замените на ваш способ получения userId
      const allNotifications = await getLatestTransactions(user.$id);
      const latestNotifications = allNotifications.slice(0, 5);

      const formattedNotifications = latestNotifications.map(
        (notification) => ({
          ...notification,
          randomId: convertToRandom9Digits(),
        })
      );

      setNotifications(formattedNotifications);
      setIsLoaded(true);
    } catch (error) {
      console.error("Ошибка при получении уведомлений:", error.message);
    }
  };

  const convertToRandom9Digits = () => {
    return Math.floor(100000000 + Math.random() * 900000000).toString();
  };

  const handleGetNotifications = () => {
    setShowNotifications((prev) => !prev);
  };

  const handleRemoveNotification = (randomId) => {
    const updatedNotifications = notifications.filter(
      (notification) => notification.randomId !== randomId
    );
    setNotifications(updatedNotifications);

    if (updatedNotifications.length === 0) {
      setShowNotifications(false);
    }
  };

  const handleCloseNotifications = () => {
    setShowNotifications(false);
  };

  const handleOpenMenu = () => {
    setOpenBurgerMenu((prev) => !prev);
    setToggleIcon((prevIcon) =>
      prevIcon === icons.menuIcon ? icons.closeIcon : icons.menuIcon
    );
  };

  return (
    <>
      {/* Мобильный хедер */}
      <header className="md:hidden fixed mb-12 top-0 left-0 w-full flex items-center justify-between p-4 z-30 bg-white">
        <button onClick={handleOpenMenu} aria-label="Toggle Menu">
          <Image src={toggleIcon} alt="Burger Menu" width={25} height={25} />
        </button>
        <div className="logo">
          <Image src={images.logo2} alt="Logo" width={120} height={30} />
        </div>

        <div className="relative">
          <div className="cursor-pointer" onClick={handleGetNotifications}>
            <Image
              src={icons.notificationsLogo}
              alt="Notification"
              width={24}
            />
          </div>
          {notifications.length > 0 && (
            <Image
              className="absolute top-[-5px] right-[-5px]"
              src={icons.redLogo}
              alt="Alarm"
              width={7}
              height={7}
            />
          )}

          {showNotifications && (
            <div className="absolute right-4 top-[40px] bg-white border shadow-lg rounded-md p-4 w-80 z-50 ">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">Последние транзакции</h3>
                <button
                  onClick={handleCloseNotifications}
                  aria-label="Close Notifications"
                >
                  <Image
                    src={icons.closeIcon} // Убедитесь, что у вас есть иконка для креста
                    alt="Close"
                    width={20}
                    height={20}
                  />
                </button>
              </div>
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification.randomId}
                    className="mb-2 p-2 border-b flex justify-between items-center"
                  >
                    <div>
                      <p className="text-sm text-gray-700 font-mono">
                        {notification.randomId}{" "}
                        <span className="text-sm text-green-600">
                          Подтверждена
                        </span>
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        handleRemoveNotification(notification.randomId)
                      }
                      className="text-red-500 text-xs hover:underline"
                    >
                      Удалить
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">Уведомлений нет</p>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Десктопная версия */}
      <div className={`container w-[300px] md:block hidden`}>
        <div className="sidebar md:h-[1250px] lg:h-screen h-screen bg-customGray px-[20px] pt-[25px]">
          <div className="logo mb-[21px]">
            <Image src={images.logo} alt="Logo" width={200} height={50} />
          </div>
          <div className="sidebar_links flex flex-col justify-between h-[calc(100%-225px)]">
            <ul className="nav_block text-gray-200 text-[14px]">
              <li
                className={`nav_link flex items-center gap-3 cursor-pointer px-[20px] py-[17px] ${
                  pathname === "/profile"
                    ? "bg-customOrange text-white opacity-100"
                    : "text-gray-400 hover:text-gray-200 opacity-50"
                }`}
                onClick={toggleProfileLinks}
              >
                <Image
                  src={icons.profileIcon}
                  alt="Profile Icon"
                  width={20}
                  height={20}
                />
                Профиль
              </li>
              {showProfileLinks && (
                <div className="pl-[40px]">
                  {links
                    .filter(
                      (link) =>
                        link.text === "Денежные средства" ||
                        link.text === "Личные данные"
                    )
                    .map((link, index) => (
                      <Link href={link.forward} key={index}>
                        <li
                          className={`nav_link flex items-center gap-3 px-[20px] py-[17px] rounded-[10px] ${
                            pathname === link.forward
                              ? "bg-customOrange text-white opacity-100"
                              : "text-gray-400 hover:text-gray-200 opacity-50"
                          }`}
                        >
                          <Image
                            src={link.icon}
                            alt={`${link.text} Icon`}
                            width={20}
                            height={20}
                          />
                          {link.text}
                        </li>
                      </Link>
                    ))}
                </div>
              )}

              {/* Остальные ссылки */}
              {links
                .filter(
                  (link) =>
                    ![
                      "Профиль",
                      "Денежные средства",
                      "Личные данные",
                      "Выйти из профиля",
                      "На главную",
                    ].includes(link.text)
                )
                .map((link, index) => (
                  <Link href={link.forward} key={index}>
                    <li
                      className={`nav_link flex cursor-pointer items-center gap-3 px-[20px] py-[17px] rounded-[10px] transition-all duration-150 ${
                        pathname === link.forward
                          ? "bg-customOrange text-white opacity-100"
                          : "text-gray-400 hover:text-gray-200 opacity-50"
                      }`}
                      onClick={() => handleLinkClick(link.text)}
                    >
                      <Image
                        src={link.icon}
                        alt={`${link.text} Icon`}
                        width={20}
                        height={20}
                      />
                      {link.text}
                    </li>
                  </Link>
                ))}
            </ul>

            {/* Ссылки внизу */}
            <div>
              <Link
                href={"/main"}
                className={`nav_link flex items-center cursor-pointer gap-3 px-[20px] py-[17px] rounded-[10px] ${
                  pathname === "/main"
                    ? "bg-customOrange text-white opacity-100"
                    : "text-gray-400 hover:text-gray-200 opacity-50"
                }`}
              >
                <Image
                  src={links.find((link) => link.text === "На главную")?.icon}
                  alt="Arrow Back Icon"
                  width={20}
                  height={20}
                />
                На главную
              </Link>
              <button
                className="nav_link flex text-gray-400 items-center cursor-pointer gap-3 px-[20px] py-[17px] rounded-[10px] hover:text-gray-200 hover:opacity-100"
                onClick={handleSignOut}
              >
                <Image
                  src={
                    links.find((link) => link.text === "Выйти из профиля")?.icon
                  }
                  alt="Logout Icon"
                  width={20}
                  height={20}
                />
                Выйти из профиля
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Мобильная версия */}
      {openBurgerMenu && (
        <div>
          <div className="fixed top-12 left-0 w-full h-full bg-customGray z-20 shadow-lg flex flex-col">
            <div className="flex-grow p-5 overflow-y-auto h-1/2">
              <ul className="nav_block text-gray-100 text-[14px]">
                <li
                  className="nav_link flex items-center opacity-70 gap-3 cursor-pointer px-[20px] py-[17px]"
                  onClick={toggleProfileLinks}
                >
                  <Image
                    src={icons.profileIcon}
                    alt="Profile Icon"
                    width={20}
                    height={20}
                  />
                  Профиль
                </li>

                {showProfileLinks && (
                  <div className="pl-[40px]">
                    {links
                      .filter(
                        (link) =>
                          link.text === "Денежные средства" ||
                          link.text === "Личные данные"
                      )
                      .map((link, index) => (
                        <Link
                          href={link.forward}
                          key={index}
                          onClick={() => setOpenBurgerMenu(false)}
                        >
                          <li
                            className={`nav_link flex items-center gap-3 px-[20px] py-[17px] rounded-[10px] transition-all duration-150 ${
                              pathname === link.forward
                                ? "opacity-100 text-white bg-customOrange"
                                : "opacity-70"
                            } hover:bg-customOrange`}
                          >
                            <Image
                              src={link.icon}
                              alt={`${link.text} Icon`}
                              width={20}
                              height={20}
                            />
                            {link.text}
                          </li>
                        </Link>
                      ))}
                  </div>
                )}

                {/* Остальные ссылки */}
                {links
                  .filter(
                    (link) =>
                      ![
                        "Профиль",
                        "Денежные средства",
                        "Личные данные",
                        "Выйти из профиля",
                        "На главную",
                      ].includes(link.text)
                  )
                  .map((link, index) => (
                    <Link
                      href={link.forward}
                      key={index}
                      onClick={() => setOpenBurgerMenu(false)}
                    >
                      <li
                        className={`nav_link flex cursor-pointer items-center gap-3 px-[20px] py-[17px] rounded-[10px] transition-all duration-150 ${
                          pathname === link.forward
                            ? "opacity-100 text-white bg-customOrange"
                            : "opacity-70"
                        } hover:bg-customOrange`}
                      >
                        <Image
                          src={link.icon}
                          alt={`${link.text} Icon`}
                          width={20}
                          height={20}
                        />
                        {link.text}
                      </li>
                    </Link>
                  ))}
              </ul>
            </div>

            <div className="p-5 h-1/2">
              <Link
                href={"/main"}
                className="nav_link flex text-white items-center cursor-pointer bg-transparent opacity-70 gap-3 px-[20px] py-[17px] rounded-[10px] hover:bg-customOrange"
                onClick={() => setOpenBurgerMenu(false)}
              >
                <Image
                  src={links.find((link) => link.text === "На главную")?.icon}
                  alt="Arrow Back Icon"
                  width={20}
                  height={20}
                />
                На главную
              </Link>
              <button
                className="nav_link flex text-white items-center cursor-pointer opacity-70 gap-3 px-[20px] py-[17px] rounded-[10px] hover:bg-customOrange"
                onClick={handleSignOut}
              >
                <Image
                  src={
                    links.find((link) => link.text === "Выйти из профиля")?.icon
                  }
                  alt="Logout Icon"
                  width={20}
                  height={20}
                />
                Выйти из профиля
              </button>
            </div>
          </div>

          {/* <Footer /> */}
        </div>
      )}
    </>
  );
};

export default Sidebar;
