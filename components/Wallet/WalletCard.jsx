import Image from "next/image";

export default function WalletCard({
  icon,
  title,
  percent,
  withdrawed,
  deposited,
}) {
  return (
    <>
      <div className="border rounded-xl drop-shadow p-5 flex-wrap w-[347px]">
        <div className="flex mb-8 gap-4 items-center ">
          <div className="bg-customOrange rounded-full p-2">
            <Image src={icon} width={24} alt="Icon" />
          </div>
          <h2 className="text-[18px]">{title}</h2>
        </div>
        <p className="text-[26px]">
          {(percent && percent) ||
            (withdrawed && withdrawed) ||
            (deposited && deposited)}
        </p>
      </div>
    </>
  );
}
