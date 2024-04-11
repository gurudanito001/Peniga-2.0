import SideNav from '@/app/ui/dashboard/sidenav';
import NavBar from '../ui/navbar';
import styles from '../styles.module.css';
import Image from 'next/image';
import { BellIcon, Bars3BottomRightIcon, EyeSlashIcon, PaperAirplaneIcon, PlusIcon } from '@heroicons/react/24/outline';
import NavBarMobile from '../ui/dashboard/navbar';

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <>
      <main className={`h-screen hidden md:flex md:flex-row md:overflow-hidden md:p-4 ${styles.bgImage}`}>
        <div className="w-full flex-none md:w-1/5 bg-white bg-opacity-90">
          <SideNav />
        </div>
        <div className="flex flex-col grow p-4 md:w-4/5 bg-white bg-opacity-60">
          <NavBar />
          {children}
        </div>
      </main>

      <main className={`h-screen overflow-hidden md:hidden ${styles.bgImage}`}>
        <div className='h-screen glass px-4 pt-6 flex flex-col border border-red-500'>
          {children}
          <div className="btm-nav btm-nav-md rounded-t-xl glass bg-primary text-white shadow-inner">
            <div>
              <button className='btn btn-circle glass text-white'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              </button>
            </div>

            <div>
              <button className='btn btn-circle glass text-white'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </button>
            </div>

            <div>
              <button className='btn btn-circle glass text-white'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              </button>
            </div>
          </div>
        </div>
      </main>
    </>

  );
}