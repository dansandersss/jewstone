import icons from "@/constants/icons";
import { socialLinks } from "@/constants/navLinks";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <div className="p-3 w-full flex items-center text-customWhiteLight justify-center fixed bottom-0 bg-customGray border-customOrange border-t-2 z-30">
        <div className="container flex flex-col items-center gap-1 justify-center">
          <div className="information text-[16px] text-center flex flex-col gap-1">
            <p>+7 936-130-44-03</p>
            <p>jew.stone@yandex.ru</p>
            <p>Следи за нами в соц сетях:</p>
          </div>
          <div className="socials flex gap-2 items-center">
            {socialLinks.map((socialLink) => (
              <Link
                href={socialLink.forward}
                className="hover:scale-125 scale-100 transition-all ease-in duration-150"
              >
                <Image src={socialLink.icon} alt="Telegram" width={22} />
              </Link>
            ))}
          </div>
          <p>@2024 JEWSTONE Company Copiration National</p>
        </div>
      </div>
    </>
  );
}
