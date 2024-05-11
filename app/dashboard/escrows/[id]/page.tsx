
import { lusitana } from '@/app/ui/fonts';
import WalletCard from '@/app/ui/dashboard/walletCard';
import Tabs from '@/app/ui/dashboard/tabs';
import {TransactionCard} from '@/app/ui/listItems';
import { ArrowLongRightIcon, ArrowDownLeftIcon, ArrowRightIcon, PhotoIcon, PaperAirplaneIcon, ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';
import ModalTemplate from '@/app/ui/dashboard/modalTemplate';
import { getEscrowById } from '@/app/lib/data';
import moment from 'moment';
import { Metadata } from 'next';
import Link from 'next/link';
import formatAsCurrency from '@/app/lib/formatAsCurrency';

export const metadata: Metadata = {
  title: 'Dashboard',
};


export default async function Page({params}: {params: {id: string}}) {
  const escrow = await getEscrowById(params?.id);
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
                <dt className='font-medium text-base-content text-sm'>Seller</dt>
                <dd className='ml-auto'>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img className='rounded-full' src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt='placeholder user' />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{escrow?.trade?.seller?.firstName} {escrow?.trade?.seller?.lastName}</div>
                      <div className="text-xs opacity-50">{escrow?.trade?.seller?.username || escrow?.trade?.seller?.email}</div>
                    </div>
                  </div>
                </dd>
              </div>

              <div className='flex items-center border-b py-3'>
                <dt className='font-medium text-base-content text-sm'> Amount</dt>
                <dd className={`${lusitana.className} text-base-content font-semibold ml-auto`}>₦{formatAsCurrency(escrow?.amount)}</dd>
              </div>

              <div className='flex items-center border-b py-3'>
                <dt className='font-medium text-base-content text-sm'>Status</dt>
                <dd className={`text-base-content font-semibold ml-auto`}>
                  <span className="badge badge-ghost badge-success text-xs text-success">{escrow?.status}</span>
                </dd>
              </div>

              <div className='flex items-center py-3'>
                <dt className='font-medium text-base-content text-sm'>Date Created</dt>
                <dd className={`text-base-content font-semibold ml-auto`}>
                  <p className="text-xs text-base-content opacity-60">{moment(escrow?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
                </dd>
              </div>
            </dl>
          </section>

          <h3 className={`${lusitana.className} text-base-content text-lg font-bold mt-8 mb-2`}>
            Trade Details
          </h3>
          <section className='bg-neutral max-w-xl p-3 md:p-5 rounded-lg'>
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
                      <div className="font-bold capitalize">{escrow?.trade?.buyer?.firstName} {escrow?.trade?.buyer?.lastName}</div>
                      <div className="text-xs opacity-50">{escrow?.trade?.buyer?.username || escrow?.trade?.buyer?.email}</div>
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
                      <div className="font-bold capitalize">{escrow?.trade?.seller?.firstName} {escrow?.trade?.seller?.lastName}</div>
                      <div className="text-xs opacity-50">{escrow?.trade?.seller?.username || escrow?.trade?.seller?.email}</div>
                    </div>
                  </div>
                </dd>
              </div>

              <div className='flex items-center border-b py-3'>
                <dt className='font-medium text-base-content text-sm'>Card Name</dt>
                <dd className={`text-base-content font-semibold ml-auto`}>${formatAsCurrency(escrow?.trade?.valueInUSD)} {escrow?.trade?.cardName}</dd>
              </div>

              <div className='flex items-center border-b py-3'>
                <dt className='font-medium text-base-content text-sm'>Rate</dt>
                <dd className={`${lusitana.className} text-base-content font-semibold ml-auto`}>₦{formatAsCurrency(escrow?.trade?.rate)}</dd>
              </div>

              <div className='flex items-center border-b py-3'>
                <dt className='font-medium text-base-content text-sm'>Transaction Amount</dt>
                <dd className={`${lusitana.className} text-base-content font-semibold ml-auto`}>₦{escrow?.trade?.rate && formatAsCurrency(escrow?.trade?.rate * escrow?.trade?.valueInUSD)}</dd>
              </div>

              <div className='flex items-center border-b py-3'>
                <dt className='font-medium text-base-content text-sm'>Card Type</dt>
                <dd className={`text-base-content font-semibold ml-auto capitalize`}>{escrow?.trade?.cardType}</dd>
              </div>

              <div className='flex items-center py-3'>
                <dt className='font-medium text-base-content text-sm'>Dispute</dt>
                <dd className={`text-base-content font-semibold ml-auto`}>
                  {escrow?.trade?.dispute ?
                    <Link href={`/dashboard/dispute/${escrow?.trade?.dispute?.id}`} className="flex items-center text-accent p-2">view <ArrowRightIcon className='w-3 ml-2' /> </Link>
                    : "none"}
                </dd>
              </div>
            </dl>
          </section>
        </section>
      </div>

    </>


  )
}