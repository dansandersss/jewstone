"use client";
import { useGlobalContext } from "@/context/GlobalProvider";
import Image from "next/image";
import ProfileInfo from "./ProfileInfo";

export default function ProfileComp() {
  const { user } = useGlobalContext();
  console.log(user?.avatar);
  return (
    <>
      <div className="container">
        <h1 className="text-customOrange text-[26px] font-bold mb-5 sm:text-center md:text-left">
          Личные данные
        </h1>

        <div className="flex items-center justify-between">
          <div>
            <div>
              <Image
                src={user?.avatar}
                width={220}
                height={220}
                className="rounded-full"
                alt="Avatar"
              />
            </div>
          </div>
          <ProfileInfo />
        </div>
      </div>
    </>
  );
}
