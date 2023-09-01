import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "@/utils/api";
import { CustomNavbar } from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import NextTopLoader from "nextjs-toploader";

import { Inter } from "next/font/google";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ["latin"], preload: true });

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <NextUIProvider>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <SessionProvider session={session}>
          <main className="text-foreground">
            <NextTopLoader />
            <style jsx global>{`
              html {
                font-family: ${inter.style.fontFamily};
              }
            `}</style>
            <div className="flex h-screen w-full flex-col">
              <CustomNavbar />
              <div className="flex-1 px-4 py-4">
                <Component {...pageProps} />
              </div>
            </div>
          </main>
          <ToastContainer position="bottom-right" />
        </SessionProvider>
      </ThemeProvider>
    </NextUIProvider>
  );
};

export default api.withTRPC(MyApp);
