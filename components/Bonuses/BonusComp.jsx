import { bonuses } from "@/constants/bonuses";
import Image from "next/image";
import CustomButton from "../CustomButton/CustomButton";

export default function BonusComp() {
  return (
    <>
      <div className="container  mb-[230px] md:mb-0">
        <h1 className="text-customOrange text-[26px] font-bold mb-5 sm:text-center md:text-left">
          Бонусы
        </h1>

        <div className="flex flex-wrap md:flex-nowrap gap-5 justify-center md:justify-between items-center">
          {bonuses.map((bonus, index) => (
            <div
              key={index}
              className="relative border rounded-[10px] p-[15px] shadow-md w-[347px]"
            >
              <div className="bg-customOrange rounded-full absolute text-white text-[12px] py-[17px] px-[5px] top-2 left-2">
                {bonus.tagMark}
              </div>
              <Image src={bonus.img} alt="Bonus" width={317} />

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

        <CustomButton
          text="Связаться с владельцем"
          customClass="bg-customGray text-white w-full mt-5"
        />
      </div>
    </>
  );
}
