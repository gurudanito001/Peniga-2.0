"use client"

import { BellIcon, Bars3BottomRightIcon } from '@heroicons/react/24/outline';
import { ReactHTMLElement, useRef } from 'react';
import styles from "../../styles.module.css";


const NavBar = () => {
  return (
    <header className='flex items-center z-40'>
      <div className="avatar">
        <div className="w-14 rounded-full">
          {/* <Image src="/placeholder-user.jpeg" alt='Placeholder user' width={40} height={40} /> */}
          <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt='placeholder user' />
        </div>
      </div>
      <p className='text-gray-700 ms-3 '>
        <span className='font-semibold'>Hi,</span> <span className='text-gray-950 font-bold'>Daniel</span>
      </p>
      {/* <button className="btn btn-circle btn-sm btn-outline ml-auto">
        <BellIcon className="w-5 text-gray-950" />
      </button> */}

      <div className="drawer drawer-end w-9 ml-auto z-10">
        <input id="notification-drawer" type="checkbox" className="drawer-toggle" />
        <div className='z-10'>
          {/* Page content here */}
          <label htmlFor="notification-drawer" className="btn btn-circle btn-sm btn-outline glass drawer-button text-gray-950 flex align-middle">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
            </svg>
          </label>
        </div>
        <div className="drawer-side z-30">
          <label htmlFor="notification-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full text-base-content rounded-xl bg-base opacity-95">
            {/* Sidebar content here */}
            <li><a>Sidebar Item 1000</a></li>
            <li><a>Sidebar Item 2000</a></li>
          </ul>
        </div>
      </div>
      
      <div className="drawer drawer-end w-9 ml-3">
        <input id="menu-drawer" type="checkbox" className="drawer-toggle" />
        <div>
          <label htmlFor="menu-drawer" className="btn btn-circle btn-sm btn-outline glass drawer-button text-gray-950 flex align-middle">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
            </svg>
          </label>
        </div>
        <div className="drawer-side z-30">
          <label htmlFor="menu-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className={`menu p-4 w-80 min-h-full text-base-content rounded-xl bg-base opacity-95`}>
            <li><a>Sidebar Item 1</a></li>
            <li><a>Sidebar Item 2</a></li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default NavBar