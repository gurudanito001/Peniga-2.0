
import { lusitana } from '@/app/ui/fonts';
import WalletCard from '@/app/ui/dashboard/walletCard';
import Tabs from '@/app/ui/dashboard/tabs';
import {TradesCard} from '@/app/ui/listItems';
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
        <h1 className={`mb-4 text-base-content text-2xl font-bold`}>
          Seller MarketPlace
        </h1>

        <section className='mt-4 flex flex-col rounded-xl pt-5 pb-3 max-w-xs'>
          <div role="tablist" className="tabs tabs-lifted">
            <Link role="tab" href="/dashboard/market/merchant" 
            className={`tab text-xs font-bold uppercase text-base-content`}>
              Merchant
            </Link>
            <Link role="tab" href="/dashboard/market/seller" 
            className={`tab text-xs font-bold uppercase tab-active [--tab-bg:#f6f3fd] opacity-75 [--tab-border-color:#691883] text-primary`}>
              Seller
            </Link>
          </div>
        </section>

        <div className="flex flex-col grow h-auto overflow-y-scroll bg-white opacity-85 w-full rounded">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Seller</th>
                <th>Giftcard</th>
                <th>Rate</th>
                <th>Type / Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className='text-gray-950'>
              <tr>
                <td>1</td>
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
                <td className={`${lusitana.className} text-base-content font-semibold`}>$400 Sephora</td>
                <td className={`${lusitana.className} text-base-content font-semibold`}>N1,200</td>
                <td>
                  <p>Physical Card</p>
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
          Escrows
        </h1>
        <ul className='mt-4 grow overflow-y-auto'>
          <TradesCard />
          <TradesCard />
          <TradesCard />
          <TradesCard />
          
        </ul>
      </div>
    </>


  )
}