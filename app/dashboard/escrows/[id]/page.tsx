
import { lusitana } from '@/app/ui/fonts';
import WalletCard from '@/app/ui/dashboard/walletCard';
import Tabs from '@/app/ui/dashboard/tabs';
import {TransactionCard} from '@/app/ui/listItems';
import { ArrowLongRightIcon, ArrowDownLeftIcon, ArrowRightIcon, PhotoIcon, PaperAirplaneIcon, ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';
import ModalTemplate from '@/app/ui/dashboard/modalTemplate';

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Dashboard',
};


export default async function Page({params}: any) {
  return (
    <>

      <div className='flex grow h-auto overflow-hidden w-full'>
        <section className='w-full lg:w-3/5 h-auto overflow-y-auto pb-20 lg:pb-0'>
          <header className='max-w-xl'>
            <h1 className={`${lusitana.className} text-base-content text-2xl font-bold`}>
              View Escrow
            </h1>
            <div className='flex items-center'>
              <div className="text-sm breadcrumbs">
                <ul>
                  <li className='text-base-content'><Link href="/dashboard/escrows">List Escrows</Link></li>
                  <li className='text-primary font-bold'><Link href={`/dashboard/escrows/${params.id}`}>View Escrow</Link></li>
                </ul>
              </div>
            </div>
          </header>

          <section className='bg-neutral max-w-xl p-3 md:p-5 rounded-lg mt-5'>
            <dl className='text-base-content'>

              <div className='flex items-center border-b py-3'>
                <dt className='font-medium text-base-content text-sm'>Buyer</dt>
                <dd className='ml-auto'>
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
                </dd>
              </div>

              <div className='flex items-center border-b py-3'>
                <dt className='font-medium text-base-content text-sm'>Seller</dt>
                <dd className='ml-auto'>
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
                </dd>
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


              <div className='flex items-center border-b py-3'>
                <dt className='font-medium text-base-content text-sm'>Card Name</dt>
                <dd className={`text-base-content font-semibold ml-auto`}>$200 Sephora</dd>
              </div>

              <div className='flex items-center border-b py-3'>
                <dt className='font-medium text-base-content text-sm'>Card Type</dt>
                <dd className={`text-base-content font-semibold ml-auto`}>Physical</dd>
              </div>

              <div className='flex items-center border-b py-3'>
                <dt className='font-medium text-base-content text-sm'>Rate</dt>
                <dd className={`${lusitana.className} text-base-content font-semibold ml-auto`}>₦1,000</dd>
              </div>

              <div className='flex items-center border-b py-3'>
                <dt className='font-medium text-base-content text-sm'>Transaction Amount</dt>
                <dd className={`${lusitana.className} text-base-content font-semibold ml-auto`}>₦200,000</dd>
              </div>

              <div className='flex items-center border-b py-3'>
                <dt className='font-medium text-base-content text-sm'>Status</dt>
                <dd className={`text-base-content font-semibold ml-auto`}>
                  <span className="badge badge-ghost badge-success text-xs text-success">Successful</span>
                </dd>
              </div>

              <div className='flex items-center border-b py-3'>
                <dt className='font-medium text-base-content text-sm'>Escrow</dt>
                <dd className={`text-base-content font-semibold ml-auto`}>none</dd>
              </div>

              <div className='flex items-center border-b py-3'>
                <dt className='font-medium text-base-content text-sm'>Dispute</dt>
                <dd className={`text-base-content font-semibold ml-auto`}>none</dd>
              </div>

              <div className='flex items-center py-3'>
                <dt className='font-medium text-base-content text-sm'>Date Created</dt>
                <dd className={`text-base-content font-semibold ml-auto`}>
                  <p className="text-xs text-base-content opacity-60">Apr 7th, 2024 15:57:22</p>
                </dd>
              </div>


              <div className='flex items-center border-b py-3'>
                <dt className='font-medium text-base-content text-sm'>Card Name</dt>
                <dd className={`text-base-content font-semibold ml-auto`}>$200 Sephora</dd>
              </div>

              <div className='flex items-center border-b py-3'>
                <dt className='font-medium text-base-content text-sm'>Card Type</dt>
                <dd className={`text-base-content font-semibold ml-auto`}>Physical</dd>
              </div>

              <div className='flex items-center border-b py-3'>
                <dt className='font-medium text-base-content text-sm'>Rate</dt>
                <dd className={`${lusitana.className} text-base-content font-semibold ml-auto`}>₦1,000</dd>
              </div>

              <div className='flex items-center border-b py-3'>
                <dt className='font-medium text-base-content text-sm'>Transaction Amount</dt>
                <dd className={`${lusitana.className} text-base-content font-semibold ml-auto`}>₦200,000</dd>
              </div>

              <div className='flex items-center border-b py-3'>
                <dt className='font-medium text-base-content text-sm'>Status</dt>
                <dd className={`text-base-content font-semibold ml-auto`}>
                  <span className="badge badge-ghost badge-success text-xs text-success">Successful</span>
                </dd>
              </div>

              <div className='flex items-center border-b py-3'>
                <dt className='font-medium text-base-content text-sm'>Escrow</dt>
                <dd className={`text-base-content font-semibold ml-auto`}>none</dd>
              </div>

              <div className='flex items-center border-b py-3'>
                <dt className='font-medium text-base-content text-sm'>Dispute</dt>
                <dd className={`text-base-content font-semibold ml-auto`}>none</dd>
              </div>

              <div className='flex items-center py-3'>
                <dt className='font-medium text-base-content text-sm'>Date Created</dt>
                <dd className={`text-base-content font-semibold ml-auto`}>
                  <p className="text-xs text-base-content opacity-60">Apr 7th, 2024 15:57:22</p>
                </dd>
              </div>
            </dl>
          </section>
        </section>
      </div>

    </>


  )
}