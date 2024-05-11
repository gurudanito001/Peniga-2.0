import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon, BellIcon, ArrowsPointingInIcon } from '@heroicons/react/24/outline';
import { signOut, auth } from '@/auth';
import { getUserByEmail } from '@/app/lib/data';

export default async function SideNav() {

  const session = await auth()
  console.log(session);
  const user = await getUserByEmail(session?.user?.email);
  return (
    <div className="flex flex-col h-full px-3 py-4">
      <Link
        className="mb-2 py-4"
        href="/"
      >
        <h1 className='text-2xl text-base-content font-extrabold'>Peniga</h1>
      </Link>
      <div className="flex items-center mb-5">
        <div className="avatar">
          <div className="w-10 rounded-full">
            {/* <Image src="/placeholder-user.jpeg" alt='Placeholder user' width={40} height={40} /> */}
            <img src="/customers/amy-burns.png" alt='placeholder user' />
          </div>
        </div>
        <p className='text-gray-700 ms-3'>
          <span className='font-semibold'>Hi,</span> <span className='text-gray-950 font-bold'>{user?.firstName} </span> <br/>
          {user?.role === "ADMIN" && <span className='text-xs'>{user?.role}</span>}
        </p>
      </div>
      <div className="flex flex-col grow justify-between space-x-0 space-y-2 text-sm">
        <NavLinks role={user?.role} />
        
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
