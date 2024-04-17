"use client"


import { XMarkIcon } from "@heroicons/react/24/outline";
import { lusitana } from "./fonts";
import { NotificationListItem } from "./listItems";
import { usePathname } from "next/navigation";
import clsx from "clsx";



const NavBar = () => {
  const pathname = usePathname()
  return (
    <nav  className={clsx(
      'navbar text-base-content',
      {
        'hidden lg:flex' :pathname !== "/dashboard"
      }
    )}>
      <div className="navbar-start">
        <div className="flex items-center lg:hidden">
          <div className="avatar">
            <div className="w-14 rounded-full">
              {/* <Image src="/placeholder-user.jpeg" alt='Placeholder user' width={40} height={40} /> */}
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt='placeholder user' />
            </div>
          </div>
          <p className='text-gray-700 ms-3 '>
            <span className='font-semibold'>Hi,</span> <span className='text-gray-950 font-bold'>Daniel</span>
          </p>
        </div>
      </div>



      <div className="navbar-end flex items-center">
        <div className="drawer drawer-end w-9 ml-auto z-10">
          <input id="notification-drawer" type="checkbox" className="drawer-toggle" />
          <div>
            <label htmlFor="notification-drawer" className="btn btn-circle btn-sm btn-outline glass drawer-button text-gray-950 flex align-middle">
              <div className="indicator mt-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                <span className="badge badge-md py-2 bg-accent indicator-item text-white text-xs">7</span>
              </div>
            </label>
          </div>
          <div className="drawer-side z-30">
            <label htmlFor="notification-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <div className="menu p-4 w-[350px] lg:w-[400px] min-h-full flex flex-col text-base-content rounded-xl bg-base">
              <header className="flex items-center">
                <h4 className={`${lusitana.className} text-2xl font-bold`}>Notifications</h4>
                <label htmlFor="notification-drawer" className="btn btn-circle btn-sm ml-auto">
                  <XMarkIcon className="w-4" />
                </label>
              </header>
              <section className="mt-4 h-auto w-full grow">
                <ul className="grow overflow-y-auto px-2">
                  <NotificationListItem />
                  <NotificationListItem />
                  <NotificationListItem />
                  <NotificationListItem />
                  <NotificationListItem />
                  <NotificationListItem />
                  <NotificationListItem />
                </ul>
                
              </section>
            </div>
          </div>
        </div>

        {/* <div className="drawer drawer-end w-9 ml-5 flex">
          <input id="menu-drawer-mobile" type="checkbox" className="drawer-toggle" />
          <div>
            <label htmlFor="menu-drawer-mobile" className="btn btn-circle btn-sm btn-outline glass drawer-button text-gray-950 flex align-middle">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
              </svg>
            </label>
          </div>
          <div className="drawer-side z-30">
            <label htmlFor="menu-drawer-mobile" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className={`menu p-4 w-80 min-h-full text-base-content rounded-xl bg-base opacity-95`}>
              <li><a>Sidebar Item 1</a></li>
              <li><a>Sidebar Item 2</a></li>
            </ul>
          </div>
        </div> */}
      </div>
    </nav>

  )
}

export default NavBar;