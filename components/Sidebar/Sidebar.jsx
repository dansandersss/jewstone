"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "@/utils/appwrite";

import logo from "@/constants/images";
import { links } from "@/constants/navLinks"; // Import links
import images from "@/constants/images";
import icons from "@/constants/icons";
import Footer from "../Footer/Footer";

const Sidebar = () => {
  const [showProfileLinks, setShowProfileLinks] = useState(false);
  const [openBurgerMenu, setOpenBurgerMenu] = useState(false);
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
      <header className="md:hidden fixed mb-12 top-0 left-0 w-full flex items-center justify-between p-4 z-20 bg-white">
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

        <div>
          <Image src={icons.notificationsLogo} alt="Notification" width={24} />
        </div>
      </header>

      <div className={`container w-[300px] md:block hidden`}>
        <div className="sidebar h-screen bg-customGray px-[20px] pt-[25px]">
          <div className="logo mb-[21px]">
            <Image src={images.logo} alt="Logo" width={200} height={50} />
          </div>
          <div className="sidebar_links flex flex-col justify-between h-[calc(100%-225px)]">
            <ul className="nav_block text-gray-200 text-[14px]">
              {links.map((link, index) => {
                if (link.text === "Профиль") {
                  return (
                    <li
                      key={index}
                      className={`nav_link flex items-center opacity-70 gap-3 cursor-pointer px-[20px] py-[17px] ${
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
                      <Link
                        href={link.forward}
                        key={index}
                        onClick={() => handleLinkClick(link.text)}
                      >
                        <li
                          className={`nav_link flex items-center gap-3 pl-[55px] py-[17px] bg-customGray rounded-[10px] hover:bg-customOrange transition-all duration-150 ${
                            pathname === link.forward ? "bg-customOrange" : ""
                          }`}
                        >
                          <div
                            className={`flex items-center transition-all ease-in-out hover:opacity-100 gap-3 ${
                              pathname === link.forward
                                ? "opacity-100"
                                : "opacity-60"
                            }`}
                          >
                            <Image
                              src={link.icon}
                              alt={`${link.text} Icon`}
                              width={20}
                              height={20}
                            />
                            {link.text}
                          </div>
                        </li>
                      </Link>
                    );
                  }
                  return null;
                })}
              </div>

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
                .map((link, index) => {
                  return (
                    <Link href={link.forward} key={index}>
                      <li
                        className={`nav_link flex cursor-pointer items-center gap-3 px-[20px] py-[17px] rounded-[10px] hover:bg-customOrange transition-all duration-150 ${
                          pathname === link.forward ? "bg-customOrange" : ""
                        }`}
                        onClick={() => handleLinkClick(link.text)}
                      >
                        <div
                          className={`flex items-center transition-all ease-in-out hover:opacity-100 gap-3 ${
                            pathname === link.forward
                              ? "opacity-100"
                              : "opacity-60"
                          }`}
                        >
                          <Image
                            src={link.icon}
                            alt={`${link.text} Icon`}
                            width={20}
                            height={20}
                          />
                          {link.text}
                        </div>
                      </li>
                    </Link>
                  );
                })}
            </ul>

            {/* Keep "На главную" and "Выйти из профиля" at the bottom */}
            <div>
              <Link
                href={"/main"}
                className="nav_link flex text-white items-center cursor-pointer bg-transparent opacity-70 gap-3 px-[20px] py-[17px] rounded-[10px] hover:bg-customOrange"
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
        </div>
      </div>

      {openBurgerMenu && (
        <div className="fixed top-12 text-sm p-5 left-0 w-full h-full bg-customGray z-40 shadow-lg">
          <ul className="nav_block text-gray-200 text-2xl flex flex-col items-start justify-start">
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
                    <Link href={link.forward} key={index}>
                      <li
                        className={`nav_link flex items-center gap-3 pl-[40px] pr-[30px] py-[17px] bg-customGray rounded-[10px] hover:bg-customOrange transition-all duration-150 ${
                          pathname === link.forward ? "bg-customOrange" : ""
                        }`}
                      >
                        <div
                          className={`flex items-center transition-all ease-in-out hover:opacity-100 gap-3 ${
                            pathname === link.forward
                              ? "opacity-100"
                              : "opacity-60"
                          }`}
                        >
                          <Image
                            src={link.icon}
                            alt={`${link.text} Icon`}
                            width={20}
                            height={20}
                          />
                          {link.text}
                        </div>
                      </li>
                    </Link>
                  );
                }
                return null;
              })}
            </div>

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
                    className={`nav_link px-[20px] py-[10px] cursor-pointer hover:bg-customOrange transition-all ${
                      pathname === link.forward
                        ? "bg-customOrange rounded-[10px] text-white"
                        : ""
                    }`}
                    onClick={() => setOpenBurgerMenu(false)}
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
                  </li>
                </Link>
              ))}
          </ul>

          <Footer />
        </div>
      )}
    </>
  );
};

export default Sidebar;
