import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { RevenueChartSkeleton, LatestInvoicesSkeleton, CardsSkeleton } from '@/app/ui/skeletons';
import CardWrapper from '@/app/ui/dashboard/cards';
import WalletCard from '@/app/ui/dashboard/walletCard';
import NavBar from '@/app/ui/dashboard/navbar';
import Tabs from '@/app/ui/dashboard/tabs';
import {TransactionCard} from '@/app/ui/listItems';
import { ArrowUpRightIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Dashboard',
};


export default async function Page() {
  return (
    <>
      <div className='hidden md:flex md:flex-col grow h-auto overflow-hidden'>
        <h1 className={`${lusitana.className} mb-4 text-base-content text-2xl font-bold`}>
          Dashboard
        </h1>
        <WalletCard />
        <Tabs tabItems={["transactions", "escrows", "trades"]} />

        <div className="flex flex-col grow h-auto overflow-y-scroll bg-white opacity-85 w-full rounded">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Category</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Date / Status</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className='text-gray-950'>
              <tr>
                <td>
                  <button className="flex align-middle btn btn-circle btn-sm w-10 h-10 bg-base text-error"> <ArrowUpRightIcon className="w-4" /></button>
                </td>
                <td className="text-base-content font-semibold mb-1">Fund Transfer</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img className='rounded-full' src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt='placeholder user' />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">Hart Hagerty</div>
                      <div className="text-xs opacity-50">user@exampleemail.com</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img className='rounded-full' src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt='placeholder user' />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">Hart Hagerty</div>
                      <div className="text-xs opacity-50">user@exampleemail.com</div>
                    </div>
                  </div>
                </td>
                <td>
                  <p className="text-xs text-base-content opacity-60 mb-1">Apr 7th, 2024 15:57:22</p>
                  <span className="badge badge-ghost badge-success text-xs text-success">Successful</span>
                </td>
                <td className={`${lusitana.className} text-base-content font-bold text-lg`}>₦450,000</td>
                <th>
                  <button className="btn btn-ghost btn-sm text-accent">view <ArrowRightIcon className='w-3' /> </button>
                </th>
              </tr>
            </tbody>

          </table>
        </div>



        {/* <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div> */}
      </div>

      <div className="flex md:hidden grow flex-col text-sm overflow-y-auto pb-20">
        <NavBar />
        <WalletCard />
        <Tabs tabItems={["transactions", "escrows", "trades"]} />
        <header className='flex text-base-content px-2'>
          <h6 className='font-bold'>Transactions</h6>
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
        </ul>
      </div>
    </>


  )
}