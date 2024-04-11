"use client"

import {
  UserGroupIcon,
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
const links1 = [
  { name: 'Home', href: '/dashboard',  baseHref: "/dashboard/404", icon: HomeIcon },
  /* { name: 'Invoices', href: '/dashboard/invoices', icon: DocumentDuplicateIcon,},
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon }, */
  { name: 'Your Offers', href: '/dashboard/offers', baseHref: "/dashboard/offers", icon: TableCellsIcon },
  { name: 'Trades', href: '/dashboard/trades', baseHref: "/dashboard/trades", icon: ArrowsRightLeftIcon },
  { name: 'Escrows', href: '/dashboard/escrows', baseHref: "/dashboard/escrows", icon: FolderMinusIcon },
  { name: 'Transactions', href: '/dashboard/transactions', baseHref: "/dashboard/transactions", icon: ArrowsUpDownIcon },
  { name: 'Bank Accounts', href: '/dashboard/bankAccounts', baseHref: "/dashboard/bankAccounts", icon: BanknotesIcon },
  { name: 'MarketPlace', href: '/dashboard/market/merchant', baseHref: "/dashboard/market", icon: ArrowsPointingInIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links1.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 font-medium md:flex-none md:justify-start md:p-2 md:px-3',
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
  );
}


