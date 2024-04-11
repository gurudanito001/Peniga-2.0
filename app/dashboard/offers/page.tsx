
import { lusitana } from '@/app/ui/fonts';
import WalletCard from '@/app/ui/dashboard/walletCard';
import Tabs from '@/app/ui/dashboard/tabs';
import {TransactionCard} from '@/app/ui/listItems';
import { ArrowLongRightIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

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
          Your Offers
        </h1>
        <header className='flex items-center'>
          <Tabs tabItems={["all", "merchant", "seller"]} />
          <button className='btn btn-sm btn-outline border-primary text-primary ml-auto text-xs'>+ Add New</button>
        </header>
       

        <div className="flex flex-col grow h-auto overflow-y-scroll bg-white opacity-85 w-full rounded">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Card Name</th>
                <th>Rate</th>
                <th>Range in USD</th>
                <th>Category</th>
                <th>Status</th>
                <th>Date Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className='text-gray-950'>
              <tr>
                <td>
                  1
                </td>
                <td className="text-primary font-semibold mb-1">Sephora</td>
                <td className={`${lusitana.className} text-base-content font-semibold`}>₦850</td>
                <td className={`${lusitana.className} text-base-content font-semibold`}> 
                  <span className='flex'>$150 <ArrowLongRightIcon className='w-5' /> $250</span>
                </td>
                <td className="text-base-content font-semibold">Merchant</td>
                
                <td className={`text-base-content font-bold text-lg`}>
                  <span className="badge badge-ghost badge-success text-xs text-success">Successful</span>
                </td>
                <td>
                  <p className="text-xs text-base-content opacity-60 mb-1">Apr 7th, 2024 15:57:22</p>
                </td>
                <td>
                  <button className="btn btn-ghost btn-sm text-accent">view <ArrowRightIcon className='w-3 mx-2' /> </button>
                </td>
              </tr>
              <tr>
                <td>
                  1
                </td>
                <td className="text-primary font-semibold mb-1">Sephora</td>
                <td className={`${lusitana.className} text-base-content font-semibold`}>₦850</td>
                <td className={`${lusitana.className} text-base-content font-semibold`}> 
                  <span className='flex'>$150 <ArrowLongRightIcon className='w-5' /> $250</span>
                </td>
                <td className="text-base-content font-semibold">Merchant</td>
                
                <td className={`text-base-content font-bold text-lg`}>
                  <span className="badge badge-ghost badge-success text-xs text-success">Successful</span>
                </td>
                <td>
                  <p className="text-xs text-base-content opacity-60 mb-1">Apr 7th, 2024 15:57:22</p>
                </td>
                <td>
                  <button className="btn btn-ghost btn-sm text-accent">view <ArrowRightIcon className='w-3 mx-2' /> </button>
                </td>
              </tr>
              <tr>
                <td>
                  1
                </td>
                <td className="text-primary font-semibold mb-1">Sephora</td>
                <td className={`${lusitana.className} text-base-content font-semibold`}>₦850</td>
                <td className={`${lusitana.className} text-base-content font-semibold`}> 
                  <span className='flex'>$150 <ArrowLongRightIcon className='w-5' /> $250</span>
                </td>
                <td className="text-base-content font-semibold">Merchant</td>
                
                <td className={`text-base-content font-bold text-lg`}>
                  <span className="badge badge-ghost badge-success text-xs text-success">Successful</span>
                </td>
                <td>
                  <p className="text-xs text-base-content opacity-60 mb-1">Apr 7th, 2024 15:57:22</p>
                </td>
                <td>
                  <button className="btn btn-ghost btn-sm text-accent">view <ArrowRightIcon className='w-3 mx-2' /> </button>
                </td>
              </tr>
              <tr>
                <td>
                  1
                </td>
                <td className="text-primary font-semibold mb-1">Sephora</td>
                <td className={`${lusitana.className} text-base-content font-semibold`}>₦850</td>
                <td className={`${lusitana.className} text-base-content font-semibold`}> 
                  <span className='flex'>$150 <ArrowLongRightIcon className='w-5' /> $250</span>
                </td>
                <td className="text-base-content font-semibold">Merchant</td>
                
                <td className={`text-base-content font-bold text-lg`}>
                  <span className="badge badge-ghost badge-success text-xs text-success">Successful</span>
                </td>
                <td>
                  <p className="text-xs text-base-content opacity-60 mb-1">Apr 7th, 2024 15:57:22</p>
                </td>
                <td>
                  <button className="btn btn-ghost btn-sm text-accent">view <ArrowRightIcon className='w-3 mx-2' /> </button>
                </td>
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
        <h1 className={`${lusitana.className} mb-4 text-base-content text-xl font-bold`}>
          Your Offers
        </h1>
        <Tabs tabItems={["all", "merchant", "seller"]} />
        <ul className='mt-4 grow overflow-y-auto'>
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