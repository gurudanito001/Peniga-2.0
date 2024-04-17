
import { lusitana } from '@/app/ui/fonts';
import WalletCard from '@/app/ui/dashboard/walletCard';
import Tabs from '@/app/ui/dashboard/tabs';
import {MarketListItem} from '@/app/ui/listItems';
import { ArrowLongRightIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Dashboard',
};


export default async function Page() {
  return (
    <>
      <div className='flex flex-col'>
        <h1 className={`${lusitana.className} mb-4 text-base-content text-2xl font-bold`}>
          Merchant MarketPlace
        </h1>

        <section className='flex flex-col rounded-xl py-3' style={{ width: "350px" }}>
          <div role="tablist" className="tabs tabs-lifted border-none">
            <Link role="tab" href="/dashboard/market/merchant"
              className={`tab text-xs uppercase border-none text-primary font-bold`}>
              Merchant
            </Link>
            <Link role="tab" href="/dashboard/market/seller"
              className={`tab text-xs uppercase border-none text-base-content`}>
              Seller
            </Link>
          </div>
        </section>

        <div className="hidden lg:flex flex-col grow h-auto overflow-y-scroll bg-white opacity-85 w-full rounded">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Merchant</th>
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
                  <button className="btn btn-outline btn-sm px-5 rounded-lg border-none bg-accent shadow-lg text-white hover:bg-accent hover:text-white hover:border-none hover:shadow-none ">Sell </button>
                </td>
              </tr>
            </tbody>

          </table>
        </div>

        <ul className='lg:hidden mt-4 grow overflow-y-auto'>
          <MarketListItem />
          <MarketListItem />
          <MarketListItem />
          <MarketListItem />
          <MarketListItem />
        </ul>
      </div>
    </>


  )
}