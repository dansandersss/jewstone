"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "@/utils/appwrite";

import logo from "@/constants/images";
import { links } from "@/constants/navLinks";
import images from "@/constants/images";
import icons from "@/constants/icons";

const Sidebar = () => {
  const [showProfileLinks, setShowProfileLinks] = useState(false);
  const [openBurgerMenu, setOpenBurgerMenu] = useState(false); // Контролирует открытие бургер-меню
  const pathname = usePathname();
  const router = useRouter();

  const toggleProfileLinks = () => {
    setShowProfileLinks((prev) => !prev);
  };

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

  return (
    <>
      <header className="md:hidden fixed mb-12 top-0 left-0 w-full flex items-center justify-between p-4 z-20">
        <button
          onClick={() => setOpenBurgerMenu((prev) => !prev)}
          aria-label="Toggle Menu"
        >
          <Image
            src={icons.menuIcon}
            alt="Burger Menu"
            width={25}
            height={25}
          />
        </button>
        <div className="logo">
          <Image src={images.logo2} alt="Logo" width={120} height={30} />
        </div>
      </header>

      {/* Sidebar для desktop */}
      <div className={`container w-[300px] md:block hidden`}>
        <div className="sidebar h-screen bg-customGray px-[20px] pt-[25px]">
          <div className="logo mb-[21px]">
            <Image src={images.logo} alt="Logo" width={200} height={50} />
          </div>
          <div className="sidebar_links">
            <ul className="nav_block text-gray-200 text-[14px]">
              {/* Профиль с раскрывающимся меню */}
              {links.map((link, index) => {
                if (link.text === "Профиль") {
                  return (
                    <li
                      key={index}
                      className={`nav_link flex items-center gap-3 cursor-pointer px-[20px] py-[17px] ${
                        pathname === link.forward ? "bg-customOrange" : ""
                      }`}
                      onClick={toggleProfileLinks}
                    >
                      <Image
                        src={link.icon}
                        alt={`${link.text} Icon`}
                        width={20}
                        height={20}
                      />
                      {link.text}
                    </li>
                  );
                }
                return null;
              })}

              {/* Вложенные ссылки профиля */}
              <div
                className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
                  showProfileLinks ? "max-h-[200px]" : "max-h-0"
                }`}
              >
                {links.map((link, index) => {
                  if (
                    link.text === "Денежные средства" ||
                    link.text === "Личные данные"
                  ) {
                    return (
                      <li
                        key={index}
                        className={`nav_link flex items-center gap-3 pl-[55px] py-[17px] bg-customGray rounded-[10px] hover:bg-customOrange transition-all duration-150 ${
                          pathname === link.forward ? "bg-customOrange" : ""
                        }`}
                      >
                        <Link
                          href={link.forward}
                          onClick={() => handleLinkClick(link.text)}
                        >
                          <div className="flex items-center gap-3">
                            <Image
                              src={link.icon}
                              alt={`${link.text} Icon`}
                              width={20}
                              height={20}
                            />
                            {link.text}
                          </div>
                        </Link>
                      </li>
                    );
                  }
                  return null;
                })}
              </div>

              {/* Обработка остальных ссылок */}
              {links.map((link, index) => {
                if (
                  ![
                    "Профиль",
                    "Денежные средства",
                    "Личные данные",
                    "Выйти из профиля",
                  ].includes(link.text)
                ) {
                  return (
                    <li
                      key={index}
                      className={`nav_link flex cursor-pointer items-center gap-3 px-[20px] py-[17px] rounded-[10px] hover:bg-customOrange transition-all duration-150 ${
                        pathname === link.forward ? "bg-customOrange" : ""
                      }`}
                      onClick={() => handleLinkClick(link.text)}
                    >
                      <Link href={link.forward}>
                        <div className="flex items-center gap-3">
                          <Image
                            src={link.icon}
                            alt={`${link.text} Icon`}
                            width={20}
                            height={20}
                          />
                          {link.text}
                        </div>
                      </Link>
                    </li>
                  );
                }
                return null;
              })}

              {/* Кнопка "Выйти из профиля" */}
              <li
                className="nav_link flex items-center gap-3 px-[20px] py-[17px] rounded-[10px] hover:bg-customOrange"
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
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Мобильное меню (бургер-меню) */}
      {openBurgerMenu && (
        <div className="fixed top-12 left-0 w-full h-full bg-customGray z-40 shadow-lg">
          {/* <div className="p-4">
            <Image src={images.logo} alt="Logo" width={150} height={40} />
          </div> */}
          <ul className="nav_block text-gray-200 text-2xl h-[calc(100%-225px)] flex flex-col items-center justify-center">
            {links.map((link, index) => (
              <li
                key={index}
                className="nav_link px-[20px] py-[10px] cursor-pointer hover:bg-customOrange transition-all"
                onClick={() => setOpenBurgerMenu(false)}
              >
                <Link href={link.forward}>
                  <div className="flex items-center gap-3">
                    <Image
                      src={link.icon}
                      alt={`${link.text} Icon`}
                      width={20}
                      height={20}
                    />
                    {link.text}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Sidebar;
