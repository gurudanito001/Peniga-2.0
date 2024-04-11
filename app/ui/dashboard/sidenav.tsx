import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon, BellIcon, ArrowsPointingInIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 ">
      <Link
        className="mb-2 p-4"
        href="/"
      >
        <h1 className='text-2xl text-base-content font-extrabold'>Peniga</h1>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 text-sm">
        <NavLinks />
        
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
        <form action={async () => {
            'use server';
            await signOut();
          }}>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-base text-accent opacity-70 p-3 text-sm font-medium hover:opacity-100 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block text-">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
