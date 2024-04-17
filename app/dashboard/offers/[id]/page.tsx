
import { lusitana } from '@/app/ui/fonts';
import WalletCard from '@/app/ui/dashboard/walletCard';
import Tabs from '@/app/ui/dashboard/tabs';
import {TransactionCard} from '@/app/ui/listItems';
import { ArrowLongRightIcon, ArrowDownLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import EditOfferModal from './editOfferModal';
import { OffersListItem } from '@/app/ui/listItems';

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Dashboard',
};


export default async function Page({params}: any) {
  return (
    <>
      <div className='flex flex-col grow h-auto overflow-hidden'>
        <header>

          <h1 className={`${lusitana.className} mb-4 text-base-content text-2xl font-bold`}>
            View Offer
          </h1>
          <div className='flex items-center'>
            <div className="text-sm breadcrumbs">
              <ul>
                <li className='text-base-content'><Link href="/dashboard/offers">List Offers</Link></li>
                <li className='text-primary font-bold'><Link href={`/dashboard/offers/${params.id}`}>View Offer</Link></li>
              </ul>
            </div>
            <EditOfferModal />
          </div>
          
        </header>

        <section className='bg-neutral max-w-xl p-5 rounded-lg mt-5'>
          <dl className='text-base-content'>

            <div className='flex items-center border-b py-3'>
              <dt className='font-medium text-base-content text-sm'>Card Name</dt>
              <dd className={`text-base-content font-semibold ml-auto`}>Withdrawal</dd>
            </div>

            <div className='flex items-center border-b py-3'>
              <dt className='font-medium text-base-content text-sm'>Rate</dt>
              <dd className={`${lusitana.className} text-base-content font-semibold ml-auto`}>₦1,000</dd>
            </div>

            <div className='flex items-center border-b py-3'>
              <dt className='font-medium text-base-content text-sm'>Range</dt>
              <dd className={`${lusitana.className} text-base-content font-semibold ml-auto`}>
                <span className='flex'>$150 <ArrowLongRightIcon className='w-5' /> $250</span>
              </dd>
            </div>

            <div className='flex items-center border-b py-3'>
              <dt className='font-medium text-base-content text-sm'>Category</dt>
              <dd className={`text-base-content font-semibold ml-auto`}>Merchant</dd>
            </div>

            <div className='flex items-center border-b py-3'>
              <dt className='font-medium text-base-content text-sm'>Status</dt>
              <dd className={`text-base-content font-semibold ml-auto`}>
                <span className="badge badge-ghost badge-success text-xs text-success">Successful</span>
              </dd>
            </div>

            <div className='flex items-center py-3'>
              <dt className='font-medium text-base-content text-sm'>Date Created</dt>
              <dd className={`text-base-content font-semibold ml-auto`}>
                <p className="text-xs text-base-content opacity-60">Apr 7th, 2024 15:57:22</p>
              </dd>
            </div>
            
          </dl>
        </section>
      </div>
    </>


  )
}