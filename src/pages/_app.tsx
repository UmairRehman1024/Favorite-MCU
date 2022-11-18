import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from 'next-themes'


import Navbar from "../components/navbar";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";


const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class">
        <Navbar></Navbar>
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
};



export default trpc.withTRPC(MyApp);
