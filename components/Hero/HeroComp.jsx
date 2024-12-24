"use client";

import images from "@/constants/images";
import Image from "next/image";
import CustomButton from "../CustomButton/CustomButton";
import icons from "@/constants/icons";
import { ourClientsInfo, advantagesInfo } from "@/constants/ourClientsInfo";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./styles.module.css";
import Footer from "../Footer/Footer";
import { useRouter } from "next/navigation";
import { checkAuth } from "@/utils/appwrite";

export default function HeroComp() {
  const router = useRouter();

  const handleClick = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLink = () => {
    window.location.href = "https://jewstonespb.ru/";
  };

  const handleLoginRedirect = async () => {
    try {
      const isAuthenticated = await checkAuth();
      if (isAuthenticated) {
        router.push("/home/wallet");
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.error("Error during authentication", error);
      router.push("/login");
    }
  };
  return (
    <>
      <section
        className="hero pt-5 pb-[300px] lg:pb-[100px] px-[15px] md:px-[80px] bg-white border-b-customOrange border flex flex-col justify-center items-center"
        style={{
          background:
            "linear-gradient(to bottom, rgba(233, 233, 235, 1), rgba(255, 255, 255, 1))",
        }}
      >
        <div className="container mt-5">
          <div className="w-full flex items-center justify-center mb-[20px] lg:mb-[106px]">
            <Image src={images.logo2} alt="Image" width={297} />
          </div>
          <div className="relative">
            <div className="flex flex-col w-full items-center justify-normal md:justify-center gap-3 sm:gap-5 relative z-20">
              <h1 className=" text-[22px] leading-[25px] font-georgia md:text-[70px] md:leading-[79.54px] text-center">
                Инвестируйте
                <br /> в ювелирные украшения <br /> на заказ и получайте прибыль
              </h1>
              <p className=" text-[14px] leading-[17.07px] md:text-[20px] md:leading-[24.38px] text-center w-[330px] md:w-[655px]">
                Вступайте в бизнес клуб и получайте дополнительный доход. С нас
                — готовы бизнес-план и управление проектом, с вас — только
                инвестиции.
              </p>
              <div className="flex flex-col gap-5 items-center">
                <CustomButton
                  text="Инвестировать сейчас"
                  customClass="bg-customGray w-[330px] sm:w-[470px] md:w-[360px] text-white py-[15px] md:py-[20px] px-[25px] md:px-[55px] rounded-none text-[16px]"
                  onClick={handleClick}
                />
                <CustomButton
                  text="Войти в личный кабинет"
                  customClass="bg-customOrange w-[330px] sm:w-[470px] md:w-[360px] text-white py-[15px] md:py-[20px] px-[25px] md:px-[55px] rounded-none text-[16px]"
                  onClick={handleLoginRedirect}
                />
              </div>
            </div>
            <Image
              src={images.image1}
              alt="Image"
              className="absolute bottom-[-250px] lg:top-[-70px] right-0 sm:right-[100px] md:right-[85px] lg:right-[100px] xl:right-[160px] z-10 w-[180px] sm:w-[185px]"
            />
            <Image
              src={images.image2}
              alt="Image"
              className="absolute bottom-[-250px] lg:top-[250px] left-0 sm:left-[100px] md:left-[85px] lg:left-[100px] xl:left-[100px] z-10 w-[180px] sm:w-[185px]"
              width={176}
            />
          </div>
        </div>
      </section>

      <section
        className="about bg-white pt-[40px] lg:pt-[100px] px-[15px] md:px-[80px]"
        style={{
          background:
            "linear-gradient(to top, rgba(233, 233, 235, 1), rgba(255, 255, 255, 1))",
        }}
      >
        <div className="container">
          <div className="flex flex-col-reverse lg:flex-row items-center justify-center md:justify-between gap-5 lg:gap-3">
            <div className="w-[330px] sm:w-[470px] lg:w-[630px]">
              <div className="swiper-container relative">
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  spaceBetween={20}
                  slidesPerView={1}
                  className="hidden md:block"
                >
                  <SwiperSlide>
                    <Image
                      src={images.slide1}
                      alt="Slide 1"
                      className="w-full h-auto"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Image
                      src={images.slide2}
                      alt="Slide 2"
                      className="w-full h-auto"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Image
                      src={images.slide3}
                      alt="Slide 3"
                      className="w-full h-auto"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Image
                      src={images.slide4}
                      alt="Slide 4"
                      className="w-full h-auto"
                    />
                  </SwiperSlide>
                </Swiper>

                {/* Стили для пагинации в виде линии */}
                <style jsx>{`
                  .swiper-container {
                    position: relative;
                  }

                  .swiper-pagination {
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    text-align: center;
                    padding: 10px 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  }

                  .swiper-pagination-bullet {
                    width: 10px;
                    height: 10px;
                    margin: 0 5px;
                    border-radius: 50%;
                    background-color: rgba(0, 0, 0, 0.3);
                    transition: background-color 0.3s;
                  }

                  .swiper-pagination-bullet-active {
                    background-color: #ff7f50; /* Цвет активного маркера */
                  }

                  .swiper-pagination-bullet:not(
                      .swiper-pagination-bullet-active
                    ) {
                    opacity: 0.5;
                  }
                `}</style>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-5">
              <div className="title flex flex-col items-center justify-center gap-3">
                <h2 className="text-[20px] font-georgia leading-[22.72px] lg:text-[20px] xl:text-[35px] lg:leading-[22.72px] xl:leading-[40px] sm:text-[35px] sm:leading-[40px] text-center">
                  JEWSTONE – производство <br></br> ювелирных изделий на заказ
                </h2>
                <Image src={icons.starsIcon} alt="Stars Icon" width={203} />
              </div>
              <p className="text-customOrange text-[16px] leading-[19.5px] lg:leading-[19.5px] lg:text-[16px] xl:text-[20px] xl:leading-[24.38px] sm:text-[20px] sm:leading-[24.38px] text-center w-[330px] sm:w-[470px]">
                Готовый проект замкнутого цикла,
                <br /> не требующий капитальных
                <br /> вложений, но с высоким NPV
              </p>
              <p className="opacity-75 w-[330px] text-[14px] lg:text-[14px] lg:leading-[17.07px] xl:text-[16px] xl:leading-[19.5px] leading-[17.07px] sm:w-[470px] sm:text-[16px] sm:leading-[19.5px] text-center">
                Бизнес направлен на производство
                <br /> уникальных индивидуальных украшений,
                <br /> учитывающих все пожелания заказчиков.
                <br /> Мы предлагаем симбиоз изделий из
                <br /> качественных материалов и отлично
                <br /> выстроенной коммуникации с ЦА
              </p>
              <CustomButton
                text="Перейти на сайт"
                customClass="custom-animated-btn bg-transparent border border-customGray w-[330px] py-[15px] sm:w-[470px] sm:py-[20px] rounded-none px-[166px]"
                onClick={handleLink}
              />
            </div>
          </div>
        </div>
      </section>

      <section
        className="our_clients bg-white pt-[40px] px-[15px]  xl:mb-0 lg:pt-[100px] flex justify-center md:px-[80px]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(233, 233, 235, 1), rgba(255, 255, 255, 1))",
        }}
      >
        <div className="container max-w-[1200px] mx-auto h-full">
          <div className="title flex flex-col items-center mb-[40px] justify-center gap-3">
            <h2 className="text-[20px] leading-[22.72px] font-georgia sm:text-[35px] sm:leading-[40px] text-center">
              Наши клиенты
            </h2>
            <Image src={icons.starsIcon} width={203} alt="Stars Icon" />
          </div>
          <div className="flex h-[720px] sm:h-full xl:h-[720px] justify-center gap-4 flex-wrap xl:flex-nowrap items-start relative">
            <div
              className="absolute w-full h-full rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(244, 229, 204, 0.5) 25%, rgba(244, 229, 204, 0) 75%)",
                filter: "blur(50px)",
              }}
            ></div>

            {ourClientsInfo.map((ourClientInfo, index) => (
              <div
                key={index}
                className={`z-10 transition-all ease-in-out duration-150 hover:-translate-y-1 flex flex-col ${
                  index % 2 === 1 ? "self-end" : "self-start"
                }`}
                style={{
                  minHeight: "200px",
                }}
              >
                <Image
                  src={ourClientInfo.image}
                  className="w-[150px] lg:w-[200px] xl:w-[305px]"
                  height={200}
                  alt="Client"
                />
                <p className="mt-3 w-[150px] lg:w-[200px] xl:w-[305px]">
                  {ourClientInfo.text}
                </p>
              </div>
            ))}
          </div>
        </div>
        <style>
          {`
      .our_clients {
        min-height: 100%; /* Делаем высоту секции гибкой */
        position: relative; /* Гарантирует, что элементы остаются внутри секции */
      }
      @media (max-width: 768px) {
        .our_clients {
          padding-top: 20px; /* Уменьшаем отступы для маленьких экранов */
        }
      }
    `}
        </style>
      </section>

      <section className="why_we pt-[40px] pb-[50px] px-[15px] lg:pt-[100px] lg:px-[80px] lg:pb-[100px] bg-white flex justify-center items-center">
        <div className="container">
          <div className="title flex flex-col items-center mb-[40px] justify-center gap-3">
            <h2 className="text-[20px] leading-[22.72px] font-georgia sm:text-[35px] sm:leading-[40px] text-center">
              Почему инвестировать в наш проект выгодно?
            </h2>
            <Image src={icons.starsIcon} alt="Stars Icon" width={203} />
          </div>
          <div className="flex flex-wrap justify-center gap-3 md:gap-5 lg:justify-center lg:gap-5 ">
            {advantagesInfo.map((advantage, index) => (
              <div
                key={index}
                className="relative w-[187px] sm:w-[440px] md:w-[305px]"
              >
                <div className="relative z-20">
                  <h3 className="text-[17px] md:text-[25px] text-customOrange font-georgia leading-[17.05px] md:leading-[28.41px] text-center pb-[7px] md:pb-[15px] mb-[7px] md:mb-[15px] border-b-black border-b">
                    {advantage.title}
                  </h3>
                  <p className="w-[187px] sm:w-[440px] md:w-[305px] text-[16px] leading-[19.5px] text-center text-customGray opacity-80">
                    {advantage.text}
                  </p>
                </div>
                <Image
                  alt="Advantage"
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
        className="invest bg-white py-0 lg:py-[60px] px-[15px] md:px-[80px] max-h-[640px] max-w-[1440px] 2xl:max-w-full"
        style={{
          backgroundImage: "url('/assets/images/investBg.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="container w-full">
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
            <div className="title flex flex-col items-center mb-[10px] justify-center gap-3">
              <h2 className="text-[20px] leading-[22.72px] sm:text-[35px] sm:leading-[40px] text-center">
                Бизнес, который будет
                <br /> востребован долгие годы
              </h2>
              <Image src={icons.starsIcon} alt="Stars Icon" width={203} />
            </div>
            <p className="text-center font-bold text-customGray leading-[19.5px] text-[16px] md:text-[20px] md:leading-[24.38px] mb-[24px] w-[470px]">
              Инвестируя в наш проект,
              <br /> вы становитесь частью стабильного
              <br /> и долгосрочного бизнеса
            </p>
            <p className="w-[330px] text-[14px] leading-[17.07px] md:w-[470px] border-b border-b-black pb-5 md:text-[16px] text-center sm:leading-[19.5px] mb-[24px] opacity-80">
              Уникальные изделия на заказ всегда
              <br /> находят своего покупателя, так как они
              <br /> соответствуют индивидуальным запросам.
            </p>

            <div className="flex items-center mb-[24px] md:mb-[40px] h-[121px]">
              <span>в</span>
              <div className="flex flex-col gap-[7px] items-center mr-[59px]">
                <h3 className="font-bold text-[70px] font-georgia leading-[79.54px] text-customOrange">
                  1,5
                </h3>
                <p className="text-[14px] leading-[17.07px] opacity-80">
                  Рост спроса
                </p>
              </div>

              <div className="flex flex-col items-center -mb-5">
                <Image
                  src={icons.upIcon}
                  width={70}
                  className="mb-[10px]"
                  alt="Up Icon"
                />
                <p className="text-[14px] leading-[17.07px] opacity-80 text-center">
                  Развивающаяся
                  <br /> индустрия
                </p>
              </div>
            </div>
            <CustomButton
              text="Инвестировать сейчас"
              customClass="bg-customGray w-[330px] sm:w-[470px] md:w-[470px] text-white rounded-none px-[25px] md:px-0 py-[15px] md:py-[18px]"
              onClick={handleClick}
            />
          </div>
        </div>
      </section>

      <section
        className="timeline bg-white pt-[40px] lg:pt-[100px] px-[15px] flex justify-center md:px-[80px] pb-[50px] lg:pb-[100px] border-b-customOrange border-b"
        style={{
          background:
            "linear-gradient(to top, rgba(233, 233, 235, 1), rgba(255, 255, 255, 1))",
        }}
      >
        <div className="container flex flex-col justify-center items-center">
          <div className="title flex flex-col items-center mb-[40px] justify-center gap-3">
            <h2 className="text-[35px] leading-[40px] text-center ">
              Карта запуска проекта
            </h2>
            <Image src={icons.starsIcon} alt="Stars Icon" width={203} />
          </div>

          <div className="mobile_timeline flex xl:hidden flex-col justify-center items-center w-full sm:w-[440px]">
            <Image
              src={icons.line1}
              alt="Line"
              height={30}
              className="mb-[10px]"
            />

            <div className="flex flex-col items-center gap-[10px] mb-[10px] w-full sm:w-[440px] justify-start sm:justify-center">
              <div>
                <Image src={images.circle1} alt="Circle" width={30} />
              </div>

              <div>
                <span className="text-[18px] leading-[21.94px] sm:text-[30px] sm:leading-[30.48px] opacity-50">
                  Завершено
                </span>
              </div>
              <div className="w-full sm:w-[440px] flex flex-col gap-[10px]">
                <h2 className="text-customOrangeDark text-[18px] leading-[20.45px] px-5">
                  Разработка концепции и анализ рынка
                </h2>
                <Image
                  src={icons.line2}
                  alt="Line"
                  className="w-[330px] sm:w-[440px]"
                />
                <p className="w-[330px] sm:w-[440px] text-[14px] leading-[14.63px] px-5">
                  Мы провели тщательное исследование рынка и выявили высокий
                  спрос на изделия на заказ. Были разработаны концепции
                  уникальных продуктов, протестированы прототипы и определены
                  ключевые направления.
                </p>
              </div>
            </div>

            <Image
              src={icons.line3}
              alt="Line"
              height={30}
              className="mb-[10px]"
            />

            <div className="flex flex-col items-center gap-[10px] w-full justify-start">
              <div>
                <Image src={images.circle2} alt="Circle" width={30} />
              </div>

              <div>
                <span className="text-[18px] leading-[21.94px] sm:text-[30px] sm:leading-[30.48px] opacity-50">
                  Завершено
                </span>
              </div>
              <div className="w-full flex flex-col gap-[10px] mb-[10px]">
                <h2 className="text-customOrangeDark  text-[18px] leading-[20.45px] px-5">
                  Запуск производства и пилотные продажи
                </h2>
                <Image
                  src={icons.line2}
                  alt="Line"
                  className="w-[330px] sm:w-[440px]"
                />
                <p className="w-[330px] sm:w-[440px] text-[14px] leading-[14.63px] px-5">
                  Мы запустили первую партию базовых украшений и изделий на
                  заказ. Продажи показали успешные результаты, что подтвердило
                  актуальность нашего продукта.
                </p>
              </div>
            </div>

            <Image
              src={icons.line3}
              alt="Line"
              height={30}
              className="mb-[10px]"
            />

            <div className="flex flex-col items-center gap-[10px] w-full justify-start">
              <div>
                <Image src={images.circle3} alt="Circle" width={30} />
              </div>

              <div>
                <span className="text-[18px] leading-[21.94px] sm:text-[30px] sm:leading-[30.48px] opacity-50">
                  Текущий этап
                </span>
              </div>
              <div className="w-full flex flex-col gap-[10px] mb-[10px]">
                <h2 className="text-customOrangeDark text-[18px] leading-[20.45px] px-5">
                  Привлечение инвестиций и обеспечение бесперебойного
                  функционирования
                </h2>
                <Image
                  src={icons.line2}
                  alt="Line"
                  className="w-[330px] sm:w-[440px]"
                />
                <p className="w-[330px] sm:w-[440px] text-[14px] leading-[14.63px] px-5">
                  На данном этапе мы привлекаем инвестиции для запуска проекта.
                  Обладая всеми инструментами, мы можем контролировать процесс и
                  получать доход.
                </p>
              </div>
            </div>

            <Image
              src={icons.line3}
              height={30}
              alt="Line"
              className="mb-[10px]"
            />

            <div className="flex flex-col items-center gap-[10px] w-full justify-start">
              <div>
                <Image src={images.circle4} alt="Circle" width={30} />
              </div>

              <div>
                <span className="text-[18px] leading-[21.94px] sm:text-[30px] sm:leading-[30.48px] opacity-50">
                  6-12 месяцев
                </span>
              </div>
              <div className="w-full flex flex-col gap-[10px]">
                <h2 className="text-customOrangeDark  text-[18px] leading-[20.45px] px-5">
                  Масштабирование и увеличение прибыли
                </h2>
                <Image
                  src={icons.line2}
                  alt="Line"
                  className="w-[330px] sm:w-[440px]"
                />
                <p className="w-[330px] text-[14px] leading-[14.63px] px-5">
                  Стабильный рост продаж и расширение клиентской базы позволят
                  нам увеличить прибыль и расширить деятельность. На этом этапе
                  инвесторы начнут получать увеличенные доходы от проекта
                </p>
              </div>
            </div>
          </div>

          <div className="hidden xl:flex flex-col justify-center items-center w-full">
            <Image
              src={icons.line1}
              alt="Line"
              height={80}
              className="mb-[10px]"
            />

            <div className="flex flex-row items-center gap-[10px] w-full justify-between">
              <div className={`${styles.line2Container} w-[45%]`}>
                <h2 className={`${styles.title} text-customOrangeDark`}>
                  Разработка концепции и анализ рынка
                </h2>
                <Image src={icons.line2} alt="Line" className="w-full" />
                <p className={`${styles.description}`}>
                  Мы провели тщательное исследование рынка и выявили высокий
                  спрос на изделия на заказ. Были разработаны концепции
                  уникальных продуктов, протестированы прототипы и определены
                  ключевые направления.
                </p>
              </div>
              <div className="mb-[10px] w-[10%]]">
                <Image
                  src={images.circle1}
                  alt="Circle"
                  width={85}
                  className="flex justify-center"
                />
              </div>
              <div className="w-[45%]">
                <span className="text-[30px] leading-[30.48px] opacity-50">
                  Завершено
                </span>
              </div>
            </div>

            <Image
              src={icons.line3}
              alt="Line"
              height={80}
              className="mb-[10px]"
            />

            <div className="flex flex-row items-center gap-[10px] w-full justify-between">
              <div className="w-[45%]">
                <span className="text-[30px] leading-[30.48px] flex justify-end opacity-50">
                  Завершено
                </span>
              </div>

              <div className="mb-[10px] flex justify-center w-[10%]">
                <Image src={images.circle2} alt="Circle" width={85} />
              </div>

              <div className={`${styles.line2Container} w-[45%]`}>
                <h2 className={`${styles.title} text-customOrangeDark`}>
                  Запуск производства и пилотные продажи
                </h2>
                <Image
                  src={icons.line2}
                  alt="Line"
                  className="-scale-x-100 w-full"
                />
                <p className={styles.description}>
                  Мы запустили первую партию базовых украшений и изделий на
                  заказ. Продажи показали успешные результаты, что подтвердило
                  актуальность нашего продукта.
                </p>
              </div>
            </div>

            <Image
              src={icons.line3}
              alt="Line"
              height={80}
              className="mb-[10px]"
            />

            <div className="flex flex-row items-center gap-[10px] w-full justify-between">
              <div className={`${styles.line2Container} w-[45%]`}>
                <h2
                  className={`${styles.title} text-customOrangeDark`}
                  style={{ top: "-90px" }}
                >
                  Привлечение инвестиций и обеспечение бесперебойного
                  функционирования
                </h2>
                <Image src={icons.line2} alt="Line" className="w-full" />
                <p className={styles.description}>
                  На данном этапе мы привлекаем инвестиции для запуска проекта.
                  Обладая всеми инструментами, мы можем контролировать процесс и
                  получать доход.
                </p>
              </div>
              <div className="mb-[10px] w-[10%] flex justify-center">
                <Image src={images.circle3} alt="Circle" width={85} />
              </div>
              <div className="w-[45%]">
                <span className="text-[30px] leading-[30.48px] opacity-50">
                  Текущий этап
                </span>
              </div>
            </div>

            <Image
              src={icons.line3}
              alt="Line"
              height={80}
              className="mb-[10px]"
            />

            <div className="flex flex-row items-center gap-[10px] w-full justify-between">
              <div className="w-[45%] flex justify-end">
                <span className="text-[30px] leading-[30.48px] opacity-50">
                  6-12 месяцев
                </span>
              </div>

              <div className="mb-[10px] w-[10%] flex justify-center">
                <Image src={images.circle4} alt="Circle" width={85} />
              </div>

              <div className={`${styles.line2Container} w-[45%]`}>
                <h2
                  className={`${styles.title} text-customOrangeDark`}
                  style={{ top: "-60px" }}
                >
                  Масштабирование и увеличение прибыли
                </h2>
                <Image
                  src={icons.line2}
                  alt="Line"
                  className="-scale-x-100 w-full"
                />
                <p className={styles.description}>
                  Стабильный рост продаж и расширение клиентской базы позволят
                  нам увеличить прибыль и расширить деятельность. На этом этапе
                  инвесторы начнут получать увеличенные доходы от проекта
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="contact bg-white pt-[32px] lg:pt-[100px] px-[15px] md:px-[80px] pb-[50px] md:pb-[100px] max-h-[900px] max-w-[1920px] 2xl:max-w-full md:bg-[url('/assets/images/contactBg.png')] md:bg-cover sm:bg-center md:bg-no-repeat"
      >
        <div className="container w-full">
          <div className="w-full md:w-1/2 flex flex-col justify-center sm:justify-normal">
            <div className="title mb-[10px] sm:mb-[30px]">
              <h2 className="text-[23px] text-center sm:text-left leading-[28.04px] sm:text-[40px] md:text-[30px] md:leading-[25px] lg:text-[40px] lg:leading-[50px] sm:leading-[50px] text-customGray font-bold">
                Хотите узнать больше?
                <br /> Свяжитесь с нами!
              </h2>
            </div>
            <p className="text-customGray text-center text-[14px] leading-[20px] sm:text-[20px] md:text-[14px] md:leading-[20px] lg:text-[20px] lg:leading-[30px] sm:text-left sm:leading-[30px] mb-[10px] sm:mb-[30px] opacity-80">
              Мы готовы обсудить все детали и ответить на ваши вопросы лично.
              Оставьте свои контактные данные, и мы свяжемся с вами для
              подробного обсуждения условий инвестирования.
            </p>

            <form className="w-full flex flex-col mb-[10px] sm:mb-[20px] gap-[15px]">
              <div className="flex flex-col sm:flex-row gap-[10px] sm:gap-[20px]">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  className=" w-full sm:w-1/2 text-[16px] leading-[19.5px] p-[15px] sm:p-[25px] md:p-[15px] lg:p-[25px] border bg-transparent border-customGray focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                <input
                  type="email"
                  placeholder="Ваш E-mail"
                  className=" w-full sm:w-1/2 text-[16px] leading-[19.5px] p-[15px] sm:p-[25px] md:p-[15px] lg:p-[25px] border bg-transparent border-customGray focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>
              <textarea
                placeholder="Сообщение (необязательное поле)"
                rows="4"
                className="w-full text-[16px] leading-[19.5px] p-[15px] sm:p-[25px] md:p-[15px] lg:p-[25px] border bg-transparent border-customGray focus:outline-none focus:ring-2 focus:ring-gray-500"
              ></textarea>
            </form>

            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-center gap-[15px]">
              <CustomButton
                text="Отправить"
                customClass="bg-customGray w-full sm:w-[300px] text-white rounded-none py-[15px] sm:py-[18px]"
              />
              <p className="w-[330px] sm:w-[315px] text-[12px] sm:text-[14px] md:text-[10px] md:leading-[10px] lg:leading-[20px] lg:text-[14px] opacity-50 leading-[20px]">
                Нажимая кнопку “Отправить”, Вы соглашаетесь с условиями Политики
                конфиденциальности
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer isFixed={false} />
    </>
  );
}
