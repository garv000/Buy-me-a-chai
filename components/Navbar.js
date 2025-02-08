"use client"
import React from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"
import { useState } from 'react'

const Navbar = () => {
    const { data: session } = useSession()
    const [showdropdown, setshowdropdown] = useState(false)
    return (
        <nav className='bg-[#FFdd00] flex justify-between items-center px-4 md:h-16'>

            <div className="logo flex">
                <Link href={'/'}>
                    <img src="/logo.webp" width={200} alt="" />
                </Link>
            </div>

            {session && <div className='flex'>
                <div className='relative'>
                    <button onClick={() => setshowdropdown(!showdropdown)} onBlur={() => { setTimeout(() => { setshowdropdown(false) }, 300); }} id="dropdownHoverButton" data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover" className=" bg-white hover:bg-gray-100 transition duration-300 ease-in-out font-bold rounded-lg px-5 py-2.5 text-center inline-flex items-center" type="button">Welcome <span className='hidden md:inline'>{session.user.email}</span><svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                    </button>
                    <div id="dropdownHover" className={`z-10 ${showdropdown ? "" : "hidden"} absolute right-0 my-1 bg-white divide-y divide-gray-100 rounded-lg shadow md:w-44 w-32 dark:bg-gray-700`}>
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
                            <li>
                                <Link href={'/dashboard'} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                            </li>
                            <li>
                                <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
                            </li>
                            <li>
                                <Link href={'/about'} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">About us</Link>
                            </li>
                            <li>
                                <Link href={'/login'} onClick={() => signOut()} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>}
            {!session && <div className='flex gap-2 md:gap-4'>
                <Link href={'/about'}>
                    <button className='hover:bg-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out'>About</button>
                </Link>
                <Link href={'/login'}>
                    <button className='bg-white hover:bg-gray-100 font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out'>Login</button>
                </Link>
            </div>}
        </nav>
    )
}

export default Navbar
