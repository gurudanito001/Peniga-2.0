"use client"

import {
  HomeIcon,
  TableCellsIcon,
  ArrowsRightLeftIcon,
  FolderMinusIcon,
  ArrowsUpDownIcon,
  BanknotesIcon,
  ArrowsPointingInIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', baseHref: "/dashboard/404", icon: HomeIcon },
  { name: 'Offers', href: '/dashboard/offers', baseHref: "/dashboard/offers", icon: TableCellsIcon },
  { name: 'Market', href: '/dashboard/market/merchant', baseHref: "/dashboard/market", icon: ArrowsPointingInIcon },
  { name: 'Trades', href: '/dashboard/trades', baseHref: "/dashboard/trades", icon: ArrowsRightLeftIcon },
  { name: 'Escrows', href: '/dashboard/escrows', baseHref: "/dashboard/escrows", icon: FolderMinusIcon },
  
];

export default function BottomNavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <div key={link.name}>
            <Link
              href={link.href}
              className={clsx(
                'btn btn-circle bg-transparent border-none gap-0 flex flex-col',
                {
                  'text-white': (pathname === link.href || pathname.includes(link.baseHref)),
                  'text-gray-400': (pathname !== link.href && !pathname.includes(link.baseHref)),
                },
              )}
            >
              <LinkIcon className="w-6" />
              <span className=' text-[10px]'>{link.name}</span>
            </Link>
          </div>
        );
      })}
    </>
  );
}


