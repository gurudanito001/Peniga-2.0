
import { lusitana } from '@/app/ui/fonts';
import WalletCard from '@/app/ui/dashboard/walletCard';
import Tabs from '@/app/ui/dashboard/tabs';
import {TransactionCard} from '@/app/ui/listItems';
import { ArrowLongRightIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import CreateOfferModal from './createOfferModal';
import { OffersListItem } from '@/app/ui/listItems';

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Dashboard',
};


export default async function Page() {
  return (
    <>
      <div className='flex flex-col grow h-auto overflow-hidden'>
        
        
        <header>
          <div className='flex items-center mb-4'>
            <h1 className={`${lusitana.className} mb-0 text-base-content text-2xl font-bold`}>
              Your Offers
            </h1>
            <CreateOfferModal />
          </div>

          <Tabs tabItems={["all", "merchant", "seller"]} />

        </header>
       

        <div className="hidden lg:flex flex-col grow h-auto overflow-y-scroll bg-white opacity-85 w-full rounded">
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
                  <Link href="/dashboard/offers/1" className="flex items-center text-accent p-2">view <ArrowRightIcon className='w-3 ml-2' /> </Link>
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
                  <Link href="/dashboard/offers/1" className="flex items-center text-accent p-2">view <ArrowRightIcon className='w-3 ml-2' /> </Link>
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
                  <Link href="/dashboard/offers/1" className="flex items-center text-accent p-2">view <ArrowRightIcon className='w-3 ml-2' /> </Link>
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
                  <Link href="/dashboard/offers/1" className="flex items-center text-accent p-2">view <ArrowRightIcon className='w-3 ml-2' /> </Link>
                </td>
              </tr>

              
            </tbody>

          </table>
        </div>

        <ul className='mt-4 lg:hidden grow overflow-y-auto'>
          <OffersListItem />
        </ul>
      </div>

      {/* <div className="flex lg:hidden grow flex-col text-sm overflow-y-auto pb-20">
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
      </div> */}
    </>


  )
}