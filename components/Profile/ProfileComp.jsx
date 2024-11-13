"use client";
import { useGlobalContext } from "@/context/GlobalProvider";
import Image from "next/image";
import ProfileInfo from "./ProfileInfo";

export default function ProfileComp() {
  const { user } = useGlobalContext();
  console.log(user?.avatar);
  return (
    <>
      <div className="container mb-[230px] md:mb-0">
        <h1 className="text-customOrange text-[26px] font-bold mb-5 sm:text-center md:text-left">
          Личные данные
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-6 rounded-[10px] border p-5">
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
