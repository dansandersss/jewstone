import { Roboto } from "next/font/google";
import Sidebar from "@/components/Sidebar/Sidebar";
import Footer from "@/components/Footer/Footer";
import GlobalProvider from "@/context/GlobalProvider";
import { NotificationProvider } from "@/context/NotificationProvider";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Task Flow",
  description: "The best way to keep your tasks straight",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${roboto.className} bg-white text-black`}>
        <NotificationProvider>
          <GlobalProvider>
            <div className="flex flex-col min-h-screen">
              <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 p-4 md:mt-0 mt-12 w-full overflow-hidden">
                  {children}
                </main>
              </div>
              <Footer />
            </div>
          </GlobalProvider>
        </NotificationProvider>
      </body>
    </html>
  );
}
