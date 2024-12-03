import images from "@/constants/images";
import Image from "next/image";
import CustomButton from "../CustomButton/CustomButton";
import icons from "@/constants/icons";
import { ourClientsInfo, advantagesInfo } from "@/constants/ourClientsInfo";

export default function HeroComp() {
  return (
    <>
      <section className="hero pt-5 pb-[65px] px-[80px] bg-white border-b-customOrange border">
        <div className="container">
          <div className="w-full flex items-center justify-center mb-[106px]">
            <Image src={images.logo2} width={297} />
          </div>
          <div className="relative">
            <div className="flex flex-col items-center justify-center gap-5 relative z-20">
              <h1 className="text-[70px] leading-[79.54px] text-center">
                Инвестируйте<br></br> в ювелирные украшения <br></br> на заказ и
                получайте прибыль
              </h1>
              <p className="text-[20px] leading-[24.38px] text-center w-[655px]">
                Вступайте в бизнес клуб и получайте дополнительный доход.
                <br></br> С нас — готовый бизнес-план и управление проектом,
                <br></br> с вас — только инвестиции.
              </p>
              <div className="flex flex-col gap-5 items-center">
                <CustomButton
                  text="Инвестировать сейчас"
                  customClass="bg-customGray w-[300px] text-white py-[20px] px-[55px] rounded-none text-[16px]"
                />
                <CustomButton
                  text="Войти в личный кабинет"
                  customClass="bg-customOrange w-[300px] text-white py-[20px] px-[55px] rounded-none text-[16px]"
                />
              </div>
            </div>
            <Image
              src={images.image1}
              className="absolute top-[-70px] right-[160px] opacity-75 z-10"
              width={176}
            />
            <Image
              src={images.image2}
              className="absolute top-[250px] left-[160px] opacity-75 z-10"
              width={176}
            />
          </div>
        </div>
      </section>
      <section className="about bg-white pt-[100px] px-[80px]">
        <div className="container">
          <div className="flex flex-row items-center justify-between">
            <div>
              <Image src={images.image3} width={630} />
            </div>
            <div className="flex flex-col gap-5">
              <div className="title flex flex-col items-center justify-center gap-3">
                <h2 className="text-[35px] leading-[40px] text-center ">
                  JEWSTONE – производство <br></br> ювелирных изделий на заказ
                </h2>
                <Image src={icons.starsIcon} width={203} />
              </div>
              <p className="text-customOrange text-[20px] leading-[24.38px] text-center w-[470px]">
                Готовый проект замкнутого цикла,
                <br /> не требующий капитальных вложений,
                <br /> но с высоким NPV
              </p>
              <p className="opacity-80 w-[470px] text-[16px] leading-[19.5px] text-center">
                Бизнес направлен на производство уникальных
                <br /> индивидуальных украшений, учитывающих все
                <br /> пожелания заказчиков. Мы предлагаем симбиоз
                <br /> изделий из качественных материалов и отлично
                <br /> выстроенной коммуникации с ЦА
              </p>
              <CustomButton
                text="Перейти на сайт"
                customClass="custom-animated-btn bg-transparent border border-customGray py-[20px] rounded-none px-[166px]"
              />
            </div>
          </div>
        </div>
      </section>
      <section
        className="our_clients bg-white pt-[100px] px-[80px]"
        style={{
          background:
            "linear-gradient(rgb(255, 255, 255), rgb(250 250 235) 50%, rgb(255, 253, 245))",
        }}
      >
        <div className="container">
          <div className="title flex flex-col items-center mb-[40px] justify-center gap-3">
            <h2 className="text-[35px] leading-[40px] text-center ">
              Наши клиенты
            </h2>
            <Image src={icons.starsIcon} width={203} />
          </div>
          <div className="flex justify-between h-[600px]">
            {ourClientsInfo.map((ourClientInfo, index) => (
              <div
                key={index}
                className={` transition-all ease-in-out duration-150 hover:-translate-y-1 flex flex-col ${
                  index % 2 === 0 ? "self-start" : "self-end"
                }`}
              >
                <Image src={ourClientInfo.image} width={305} height={200} />
                <p className="mt-3">{ourClientInfo.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="why_we bg-white pt-[100px] px-[80px] pb-[100px]">
        <div className="container">
          <div className="title flex flex-col items-center mb-[40px] justify-center gap-3">
            <h2 className="text-[35px] leading-[40px] text-center ">
              Почему инвестировать в наш проект выгодно?
            </h2>
            <Image src={icons.starsIcon} width={203} />
          </div>
          <div className="flex justify-between ">
            {advantagesInfo.map((advantage, index) => (
              <div key={index} className="relative w-[305px] h-[206px]">
                <div className="relative z-20">
                  <h3 className="text-[25px] text-customOrange leading-[28.41px] text-center pb-[15px] mb-[15px] border-b-black border-b">
                    {advantage.title}
                  </h3>
                  <p className="w-[305px] text-[16px] leading-[19.5px] text-center text-customGray opacity-80">
                    {advantage.text}
                  </p>
                </div>
                <Image
                  src={advantage.frame}
                  width={168}
                  className="absolute top-0 left-[50%] -translate-x-[50%] z-10"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        className="invest bg-white py-[60px] px-[80px] max-h-[640px] max-w-[1440px]"
        style={{
          backgroundImage: "url('/assets/images/investBg.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="container w-full">
          <div className="w-1/2 flex flex-col items-center justify-center">
            <div className="title flex flex-col items-center mb-[10px] justify-center gap-3">
              <h2 className="text-[35px] leading-[40px] text-center ">
                Бизнес, который будет
                <br /> востребован долгие годы
              </h2>
              <Image src={icons.starsIcon} width={203} />
            </div>
            <p className="text-center font-bold text-customGray text-[20px] leading-[24.38px] mb-[24px] w-[470px]">
              Инвестируя в наш проект,
              <br /> вы становитесь частью стабильного
              <br /> и долгосрочного бизнеса
            </p>
            <p className="w-[470px] border-b border-b-black pb-5 text-[16px] text-center leading-[19.5px] mb-[24px] opacity-80">
              Уникальные изделия на заказ всегда находят своего
              <br /> покупателя, так как они соответствуют
              <br /> индивидуальным запросам.
            </p>

            <div className="flex items-center mb-[40px] h-[121px]">
              <span>в</span>
              <div className="flex flex-col gap-[7px] items-center mr-[59px]">
                <h3 className="font-bold text-[70px] leading-[79.54px] text-customOrange">
                  1,5
                </h3>
                <p className="text-[14px] leading-[17.07px] opacity-80">
                  Рост спроса
                </p>
              </div>

              <div className="flex flex-col items-center">
                <Image src={icons.upIcon} width={70} className="mb-[10px]" />
                <p className="text-[14px] leading-[17.07px] opacity-80 text-center">
                  Развивающаяся
                  <br /> индустрия
                </p>
              </div>
            </div>
            <CustomButton
              text="Инвестировать сейчас"
              customClass="bg-customGray w-[470px] text-white rounded-none py-[18px]"
            />
          </div>
        </div>
      </section>

      <section className="timeline bg-white pt-[100px] px-[80px]">
        <div className="container flex flex-col justify-center items-center">
          <div className="title flex flex-col items-center mb-[40px] justify-center gap-3">
            <h2 className="text-[35px] leading-[40px] text-center ">
              Карта запуска проекта
            </h2>
            <Image src={icons.starsIcon} width={203} />
          </div>

          <div className="flex flex-col justify-center items-center w-full">
            <Image src={icons.line1} height={80} />

            <div className="flex flex-row items-center gap-[10px] w-full justify-start">
              <div className="flex flex-col items-center gap-[15px]">
                <h2 className="text-[25px] leading-[28.41px] pl-[40px] text-customOrange">
                  Разработка концепции и анализ рынка
                </h2>

                <Image src={icons.line2} width={588} />

                <p className="text-[16px] leading-[19.5px] pl-[40px] text-customGray opacity-80 w-[482px]">
                  Мы провели тщательное исследование рынка и выявили высокий
                  спрос на изделия на заказ. Были разработаны концепции
                  уникальных продуктов, протестированы прототипы и определены
                  ключевые направления.
                </p>
              </div>
              <div className="mb-[30px]">
                <Image src={images.circle1} width={85} />
              </div>
              <div className="mb-[30px]">
                <span className="text-[30px] leading-[30.48px] opacity-50">
                  Завершено
                </span>
              </div>
            </div>

            <Image src={icons.line3} height={80} />
          </div>
        </div>
      </section>
    </>
  );
}
