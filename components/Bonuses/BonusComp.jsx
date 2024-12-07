import { bonuses } from "@/constants/bonuses";
import Image from "next/image";
import CustomButton from "../CustomButton/CustomButton";

export default function BonusComp() {
  return (
    <>
      <div className="container mb-[230px]">
        <h1 className="text-customOrange text-[26px] font-bold mb-5 sm:text-center md:text-left">
          Бонусы
        </h1>

        <div className="flex flex-wrap xl:flex-nowrap gap-7 justify-center items-center">
          {bonuses.map((bonus, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center justify-center border rounded-[10px] p-[15px] shadow-md w-[347px]"
            >
              <div className="bg-customOrange rounded-full absolute text-white text-[12px] py-[17px] px-[5px] top-2 left-2">
                {bonus.tagMark}
              </div>
              <Image
                src={bonus.img}
                alt="Bonus"
                className="w-[200px] xl:w-[317px]"
              />

              <div className="border-t">
                <p className=" pt-[15px] text-[16px] font-bold leading-4">
                  {bonus.text}
                </p>

                <div className="flex items-center justify-between mt-[15px]">
                  <p className="opacity-75 text-[14px]">{bonus.subText}</p>
                  <p className="text-customOrange text-lg font-[600px]">
                    {bonus.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full flex justify-center items-center">
          <CustomButton
            text="Связаться с владельцем"
            customClass="bg-customGray text-white w-full xl:w-[1097px] mt-5"
          />
        </div>
      </div>
    </>
  );
}
