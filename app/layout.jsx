import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
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
