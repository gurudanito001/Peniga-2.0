import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { RevenueChartSkeleton, LatestInvoicesSkeleton, CardsSkeleton } from '@/app/ui/skeletons';
import CardWrapper from '@/app/ui/dashboard/cards';
import WalletCard from '@/app/ui/dashboard/walletCard';
import Tabs from '@/app/ui/dashboard/tabs';
import { TransactionCard } from '@/app/ui/listItems';
import { ArrowUpRightIcon, ArrowDownLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import CreateWallet from './createWallet';
import { auth } from '@/auth';
import { getUserByEmail, fetchTransactions } from '@/app/lib/data';
import type { User } from '@prisma/client';
import moment from 'moment';
import { Metadata } from 'next';
import Link from 'next/link';
import formatAsCurrency from '@/app/lib/formatAsCurrency';
import Transactions from './transactions';
import Escrows from './escrows';
import Trades from './trades';

export const metadata: Metadata = {
  title: 'Dashboard',
};


export default async function Page({searchParams}: {searchParams: {tab: string}}) {

  return (
    <>
      <div className='flex flex-col grow h-auto overflow-hidden'>
        <h1 className={`${lusitana.className} hidden lg:block mb-4 text-base-content text-2xl font-bold`}>
          Dashboard
        </h1>
        <WalletCard />
        <Tabs tabItems={["transactions", "escrows", "trades"]} />

        {searchParams?.tab === "transactions" && <Transactions />}
        {searchParams?.tab === "escrows" && <Escrows />}
        {searchParams?.tab === "trades" && <Trades />}



        

        <div className="flex lg:hidden grow flex-col text-sm overflow-y-auto pb-20">
          <header className='flex text-base-content px-2'>
            <Link className='ml-auto text-xs text-secondary' href="/dashboard/transactions"> Show All</Link>
          </header>
          <ul className='mt-4 grow overflow-y-auto px-2'>
            <TransactionCard />
            <TransactionCard />
            <TransactionCard />
            <TransactionCard />
            <TransactionCard />
            <TransactionCard />
            <TransactionCard />
            <TransactionCard />
            <TransactionCard />
            <TransactionCard />
            <TransactionCard />
            <TransactionCard />
            <TransactionCard />
            <TransactionCard />
          </ul>
        </div>

      </div>

    </>


  )
}