import { Montserrat } from "next/font/google"; // Импортируем шрифт Montserrat
import "./globals.css";

const montserrat = Montserrat({
  weight: ["400", "500", "700"], // Указываем нужные веса
  subsets: ["latin"], // Указываем нужный набор символов
  display: "swap", // Для оптимизации загрузки шрифта
});

export const metadata = {
  title: "JewStone",
  description: "The best way to invest your money",
  icons: {
    icon: "/icons/Taskflow_logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html className="dark">
      <body className={`${montserrat.className} bg-white`}>{children}</body>
    </html>
  );
}
