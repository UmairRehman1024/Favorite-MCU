import {useTheme} from 'next-themes'
import { IoSunnyOutline, IoMoonOutline } from 'react-icons/io5';
import { AiOutlineClose } from "react-icons/ai"
import {GiHamburgerMenu} from "react-icons/gi"


import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import Link from 'next/link'; 
import Image from 'next/image';


const Navbar = ()  => {
    return(
    <nav className="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Link href="/" className="flex items-center">
          <div className="relative h-6 w-24 mr-3 sm:h-9">
            <Image src="https://ik.imagekit.io/9m4vpfigvq/MCU_Logo.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1668706707989"  alt="MCU Logo" fill ></Image>
          </div>
          <span className="self-center md:text-xl font-semibold whitespace-nowrap dark:text-white">Favourite Mcu Movie</span>
        </Link>
        <div className="flex md:order-2">
          <DarkModeToggle></DarkModeToggle>
          <Dropdown></Dropdown>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
          <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
            <Link href="/" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Home</Link>
          </li>
          <li>
            <Link href="/results" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Results</Link>
          </li>
          </ul>
        </div>
      </div>
    </nav>
    )
}



function Dropdown() {
  return (
    <Menu >
      <Menu.Button className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" >
        <GiHamburgerMenu size={"1.5rem"}></GiHamburgerMenu>
      </Menu.Button>
      <Menu.Items className='fixed top-0 bottom-0 right-0 p-2 w-[300px] overflow-y-auto text-center bg-slate-100 dark:bg-slate-600'>
        <Menu.Button className={"flex"}>
          <AiOutlineClose size={"2rem"}></AiOutlineClose>
        </Menu.Button>
        <div className='flex flex-col justify-center h-3/4 '>
          <Menu.Item>
            {({ active }) => (
              <Link
                className={`${active && 'bg-blue-500'} text-3xl block px-4 py-2 hover:bg-gray-300  dark:hover:text-gray-600`}
                href="/"
              >
                Home
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
              className={`${active && 'bg-blue-500'} text-3xl block px-4 py-2 hover:bg-gray-300  dark:hover:text-gray-600`}
                href="/results"
              >
                Results
              </Link>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
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
        <IoSunnyOutline size="2rem" />
      ) : (
        <IoMoonOutline size="2rem" />
      )}
      </button>
    )
  }

export default Navbar

