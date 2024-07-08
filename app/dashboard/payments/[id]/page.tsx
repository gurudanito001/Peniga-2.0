
import { lusitana } from '@/app/ui/fonts';
import WalletCard from '@/app/ui/dashboard/walletCard';
import Tabs from '@/app/ui/dashboard/tabs';
import {TransactionCard} from '@/app/ui/listItems';
import { ArrowUpRightIcon, ArrowDownLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { getPaymentById, getAllBanks } from '@/app/lib/data';
import formatAsCurrency from '@/app/lib/formatAsCurrency';
import moment from 'moment';
import Image from 'next/image';
import TransferFunds from '../../(overview)/transferFunds';
import { Metadata } from 'next';
import Link from 'next/link';
import RedeemPayment from './redeemPayment';

export const metadata: Metadata = {
  title: 'Dashboard',
};


export default async function Page({params}: {params: {id: string}}) {
  const payment = await getPaymentById(params?.id);
  //const banks = await getAllBanks();
  return (
    <>
      <div className='flex flex-col grow h-full overflow-y-auto pb-20 lg:pb-0'>
        <header>
          <h1 className={`${lusitana.className} mb-4 text-base-content text-2xl font-bold`}>
            View Payment
          </h1>
          <div className="text-sm breadcrumbs">
            <ul>
              <li className='text-base-content'><Link href="/dashboard/payments">List Payments</Link></li>
              <li className='text-primary font-bold'><Link href={`/dashboard/payments/${params.id}`}>View Payment</Link></li>
            </ul>
          </div>
        </header>

        <section className='bg-neutral max-w-xl p-5 rounded-lg mt-5'>
          <dl className='text-base-content'>

            <div className='flex items-center border-b py-3'>
              <dt className='font-medium text-base-content text-sm'>Receiver</dt>
              <dd className='ml-auto'>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                  <Image src="/avatar1.png" className='rounded-full' width={40} height={40} style={{width: "40px", height: "40px", objectFit: "contain" }} alt='avatar' />
                  </div>
                  <div>
                    <div className="font-bold">{payment?.user?.firstName} {payment?.user?.lastName}</div>
                    <div className="text-xs opacity-50">{payment?.user?.username || payment?.user?.email}</div>
                  </div>
                </div>
              </dd>
            </div>

            <div className='flex items-center border-b py-3'>
              <dt className='font-medium text-base-content text-sm'>Category</dt>
              <dd className={`text-base-content font-semibold ml-auto`}>{payment?.category}</dd>
            </div>

            <div className='flex items-center border-b py-3'>
              <dt className='font-medium text-base-content text-sm'>Amount</dt>
              <dd className={`${lusitana.className} text-base-content font-semibold ml-auto`}>₦{formatAsCurrency(payment?.amount)}</dd>
            </div>

            

            <div className='flex items-center border-b py-3'>
              <dt className='font-medium text-base-content text-sm'>Status</dt>
              <dd className={`text-base-content font-semibold ml-auto`}>
                <span className="badge badge-ghost badge-success text-xs text-success">{payment?.status}</span>
              </dd>
            </div>

            <div className='flex items-center py-3'>
              <dt className='font-medium text-base-content text-sm'>Date Created</dt>
              <dd className={`text-base-content font-semibold ml-auto`}>
                <p className="text-xs text-base-content opacity-60">{moment(payment?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
              </dd>
            </div>

            {/* {payment?.status === "PENDING" &&
            <div className='flex items-center py-3'> */}
              <RedeemPayment />
            {/* </div>} */}
          </dl>

          {/* <TransferFunds  /> */}
        </section>
      </div>
    </>
  )
}