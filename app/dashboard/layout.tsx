import SideNav from '@/app/ui/dashboard/sidenav';
import NavBar from '../ui/navbar';
import styles from '../styles.module.css';
import Image from 'next/image';
import {
  HomeIcon,
  TableCellsIcon,
  ArrowsRightLeftIcon,
  FolderMinusIcon,
  ArrowsUpDownIcon,
  BanknotesIcon,
  ArrowsPointingInIcon,
} from '@heroicons/react/24/outline';
import BottomNavLinks from '../ui/dashboard/bottom-nav-links';

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <>
      <main className={`h-screen flex flex-row overflow-hidden lg:p-4 ${styles.bgImage}`}>
        <div className="hidden lg:block flex-none w-1/5 bg-white bg-opacity-90">
          <SideNav />
        </div>
        <div className="flex flex-col grow p-4 w-full lg:w-4/5 bg-base">
          <NavBar/>
          {children}
        </div>

        <div className="btm-nav btm-nav-md glass bg-primary text-white shadow-inner lg:hidden">

          <BottomNavLinks />
        </div>
      </main>

      {/* <main className={`h-screen overflow-hidden md:hidden ${styles.bgImage}`}>
        <div className='h-screen glass px-4 pt-6 flex flex-col border border-red-500'>
          {children}
          
        </div>
      </main> */}
    </>

  );
}