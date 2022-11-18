import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from 'next-themes'
import {useTheme} from 'next-themes'
import { IoSunnyOutline, IoMoonOutline } from 'react-icons/io5';



import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import { useState } from "react";

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

const Navbar = ()  => {
  return(
  <nav className="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
   <div className="container flex flex-wrap items-center justify-between mx-auto">
    <a href="/" className="flex items-center">
      <img src="https://ik.imagekit.io/9m4vpfigvq/MCU_Logo.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1668706707989" className="h-6 mr-3 sm:h-9" alt="MCU Logo"></img>
      <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Favourite Mcu Movie</span>
    </a>
    <div className="flex md:order-2">
        <DarkModeToggle></DarkModeToggle>
        <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
         <span className="sr-only">Open main menu</span>
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
      </button>
    </div>
   <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
      <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <a href="/" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Home</a>
        </li>
        <li>
          <a href="/results" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Results</a>
        </li>
      </ul>
    </div>
    </div>
  </nav>
  )
}

const DarkModeToggle = () => {
  const {theme, setTheme} = useTheme()
  const [darkMode, setDarkMode] = useState(false);

  const handleOnClick = () => {
      setTheme(theme === 'dark' ? 'light' : 'dark')
      setDarkMode(!darkMode)
  }

  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      onClick={() => handleOnClick()}
      className = ""
      
    >
      {darkMode ? (
      <IoSunnyOutline className="w-10" size="4rem" />
    ) : (
      <IoMoonOutline size="4rem" />
    )}
    </button>
  )
}

export default trpc.withTRPC(MyApp);
