"use client";
import { useState } from "react";
import CustomButton from "../CustomButton/CustomButton";

export default function StatsComp() {
  const [customClass, setCustomClass] = useState("bg-customGray");
  const handleClassChange = () => {
    setCustomClass("bg-customOrange");
  };
  return (
    <>
      <div className="container  mb-[230px] md:mb-0">
        <h1 className="text-customOrange text-[26px] font-bold mb-5 sm:text-center md:text-left">
          Статистика бизнеса
        </h1>

        <div className="border rounded-[10px] px-3 py-5 ">
          <div className="stats_header flex flex-wrap gap-5 md:flex-nowrap justify-between items-center border-b pb-5 ">
            <p>График дохода</p>
            <div className="flex gap-2">
              <CustomButton
                text="В этом месяце"
                customClass="text-white bg-customGray"
                onClick={handleClassChange}
              />
              <CustomButton
                text="Прошлый месяц"
                customClass="bg-gray-400 text-gray-200 opacity-70"
                onClick={handleClassChange}
              />
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <p>Депозит:</p>
                <p>Баланс</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="circle w-[7px] h-[7px] bg-customOrange rounded-full"></div>
                <span className="opacity-70">Депозит</span>
              </div>
            </div>

            <div className="graph h-40"></div>
          </div>
        </div>
        <div className="w-full mt-5">
          <CustomButton
            text="Получить подробный финансовый план"
            customClass="bg-customGray text-white w-full"
          />
        </div>
      </div>
    </>
  );
}
