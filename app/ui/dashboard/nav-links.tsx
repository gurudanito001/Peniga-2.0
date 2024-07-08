"use client"

import {
  HomeIcon,
  TableCellsIcon,
  ArrowsRightLeftIcon,
  FolderMinusIcon,
  ArrowsUpDownIcon,
  UserIcon,
  ArrowsPointingInIcon,
  HandThumbDownIcon,
  BanknotesIcon,
  
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.


const userLinks = [
  { name: 'Home', href: '/dashboard', baseHref: "/dashboard/404", icon: HomeIcon },
  { name: 'Your Offers', href: '/dashboard/offers', baseHref: "/dashboard/offers", icon: TableCellsIcon },
  { name: 'MarketPlace', href: '/dashboard/market/merchant', baseHref: "/dashboard/market", icon: ArrowsPointingInIcon },
  { name: 'Trades', href: '/dashboard/trades', baseHref: "/dashboard/trades", icon: ArrowsRightLeftIcon },
  { name: 'Escrows', href: '/dashboard/escrows', baseHref: "/dashboard/escrows", icon: FolderMinusIcon },
  { name: 'Transactions', href: '/dashboard/transactions', baseHref: "/dashboard/transactions", icon: ArrowsUpDownIcon },
  { name: 'Payments', href: '/dashboard/payments', baseHref: "/dashboard/payments", icon: BanknotesIcon }
];

const adminLinks = [
  { name: 'Home', href: '/dashboard', baseHref: "/dashboard/404", icon: HomeIcon },
  { name: 'Users', href: '/dashboard/users', baseHref: "/dashboard/users", icon: UserIcon },
  { name: 'MarketPlace', href: '/dashboard/market/merchant', baseHref: "/dashboard/market", icon: ArrowsPointingInIcon },
  { name: 'Trades', href: '/dashboard/trades', baseHref: "/dashboard/trades", icon: ArrowsRightLeftIcon },
  { name: 'Escrows', href: '/dashboard/escrows', baseHref: "/dashboard/escrows", icon: FolderMinusIcon },
  { name: 'Disputes', href: '/dashboard/disputes', baseHref: "/dashboard/disputes", icon: HandThumbDownIcon },
  { name: 'Transactions', href: '/dashboard/transactions', baseHref: "/dashboard/transactions", icon: ArrowsUpDownIcon },
  { name: 'Payments', href: '/dashboard/payments', baseHref: "/dashboard/payments", icon: BanknotesIcon }
];

export default function NavLinks({ role = "USER" }) {
  const pathname = usePathname();
  return (
    <>
      {role === "USER" &&
        userLinks.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'flex h-[48px] items-center justify-center gap-2 rounded-md p-3 font-medium md:flex-none md:justify-start md:p-2 md:px-3',
                {
                  'bg-primary glass text-white': (pathname === link.href || pathname.includes(link.baseHref)),
                  'text-base-content hover:bg-base hover:opacity-90 ': (pathname !== link.href && !pathname.includes(link.baseHref)),
                },
              )}
            >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        })}
      {(role === "ADMIN" || role === "SUPERADMIN") &&
        <>
          {adminLinks.map((link) => {
            const LinkIcon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  'flex h-[48px] items-center justify-center gap-2 rounded-md p-3 font-medium md:flex-none md:justify-start md:p-2 md:px-3',
                  {
                    'bg-primary glass text-white': (pathname === link.href || pathname.includes(link.baseHref)),
                    'text-base-content hover:bg-base hover:opacity-90 ': (pathname !== link.href && !pathname.includes(link.baseHref)),
                  },
                )}
              >
                <LinkIcon className="w-6" />
                <p className="hidden md:block">{link.name}</p>
              </Link>
            );
          })}
        </>
      }
    </>
  );
}


