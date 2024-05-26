
import { lusitana } from '@/app/ui/fonts';
import WalletCard from '@/app/ui/dashboard/walletCard';
import Tabs from '@/app/ui/dashboard/tabs';
import {TransactionCard} from '@/app/ui/listItems';
import { ArrowLongRightIcon, ArrowDownLeftIcon, ArrowRightIcon, PhotoIcon, PaperAirplaneIcon, ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';
import ModalTemplate from '@/app/ui/dashboard/modalTemplate';
import { getDisputeById, getTradeById } from '@/app/lib/data';
import moment from 'moment';
import { Metadata } from 'next';
import Link from 'next/link';
import formatAsCurrency from '@/app/lib/formatAsCurrency';
import Image from 'next/image';
import ChatSection from './chatSection';
import { getMessages } from '@/app/lib/data';

export const metadata: Metadata = {
  title: 'Dashboard',
};


export default async function Page({params}: {params: {id: string}}) {
  const dispute = await getDisputeById(params?.id);
  const trade = await getTradeById(dispute?.tradeId);
  const messages = await getMessages(trade?.id);
  return (
    <>

      <div className='flex grow h-auto overflow-hidden w-full'>
        

        <section className='w-full lg:w-1/2 h-auto overflow-y-auto pb-20 lg:pb-0'>
          
          <header className='max-w-xl'>
            <h1 className={`${lusitana.className} text-base-content text-2xl font-bold`}>
              View Dispute
            </h1>
            <div className='flex items-center'>
              <div className="text-sm breadcrumbs">
                <ul>
                  <li className='text-base-content'><Link href="/dashboard/disputes">List Disputes</Link></li>
                  <li className='text-primary font-bold'><Link href={`/dashboard/disputes/${params.id}`}>View Dispute</Link></li>
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
                      <Image src="/avatar1.png" className='rounded-full' width={40} height={40} style={{width: "40px", height: "40px", objectFit: "contain" }} alt='avatar' />
                    </div>
                    <div>
                      <div className="font-bold">{dispute?.trade?.buyer?.firstName} {dispute?.trade?.buyer?.lastName}</div>
                      <div className="text-xs opacity-50">{dispute?.trade?.buyer?.username || dispute?.trade?.buyer?.email}</div>
                    </div>
                  </div>
                </dd>
              </div>

              <div className='flex items-center border-b py-3'>
                <dt className='font-medium text-base-content text-sm'>Seller</dt>
                <dd className='ml-auto'>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <Image src="/avatar1.png" className='rounded-full' width={40} height={40} style={{width: "40px", height: "40px", objectFit: "contain" }} alt='avatar' />
                    </div>
                    <div>
                      <div className="font-bold">{dispute?.trade?.seller?.firstName} {dispute?.trade?.seller?.lastName}</div>
                      <div className="text-xs opacity-50">{dispute?.trade?.seller?.username || dispute?.trade?.seller?.email}</div>
                    </div>
                  </div>
                </dd>
              </div>

              <div className='flex items-center border-b py-3'>
                <dt className='font-medium text-base-content text-sm'> Raised By</dt>
                <dd className={`text-base-content font-semibold ml-auto`}>
                  {dispute?.user?.firstName} {dispute?.user?.lastName}
                </dd>
              </div>

              <div className='flex items-center border-b py-3'>
                <dt className='font-medium text-base-content text-sm'> Reason</dt>
                <dd className={` text-base-content font-semibold ml-auto`}>
                  {dispute?.reason}
                </dd>
              </div>

              <div className='flex items-center border-b py-3'>
                <dt className='font-medium text-base-content text-sm'> Media Proof</dt>
                <dd className={` text-base-content font-semibold ml-auto`}>
                  {dispute?.mediaProofType === "image" ? 
                  <Image src={dispute?.mediaProof} style={{height: "400px", width: "auto", objectFit: "contain", maxWidth: "350px" }} width={400} height={400}  alt='dispute media proof' /> :
                  <video src={dispute?.mediaProof}></video>}
                </dd>
              </div>

              <div className='flex items-center border-b py-3'>
                <dt className='font-medium text-base-content text-sm'> Dispute Winner</dt>
                <dd className={` text-base-content font-semibold ml-auto`}>
                  {dispute?.disputeWinnerId === dispute?.trade?.buyer?.id && `${dispute?.trade?.buyer?.firstName} ${dispute?.trade?.buyer?.lastName}`}
                  {dispute?.disputeWinnerId === dispute?.trade?.seller?.id && `${dispute?.trade?.seller?.firstName} ${dispute?.trade?.seller?.lastName}`}
                  {dispute?.disputeWinnerId === null && `---`} 
                </dd>
              </div>

              <div className='flex items-center border-b py-3'>
                <dt className='font-medium text-base-content text-sm'>Status</dt>
                <dd className={`text-base-content font-semibold ml-auto`}>
                  <span className="badge badge-ghost badge-success text-xs text-success">{dispute?.status}</span>
                </dd>
              </div>

              <div className='flex items-center py-3'>
                <dt className='font-medium text-base-content text-sm'>Date Created</dt>
                <dd className={`text-base-content font-semibold ml-auto`}>
                  <p className="text-xs text-base-content opacity-60">{moment(dispute?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
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
                <dt className='font-medium text-base-content text-sm'>Card Name</dt>
                <dd className={`text-base-content font-semibold ml-auto`}>${formatAsCurrency(dispute?.trade?.valueInUSD)} {dispute?.trade?.cardName}</dd>
              </div>

              <div className='flex items-center border-b py-3'>
                <dt className='font-medium text-base-content text-sm'>Rate</dt>
                <dd className={`${lusitana.className} text-base-content font-semibold ml-auto`}>₦{formatAsCurrency(dispute?.trade?.rate)}</dd>
              </div>

              <div className='flex items-center border-b py-3'>
                <dt className='font-medium text-base-content text-sm'>Transaction Amount</dt>
                <dd className={`${lusitana.className} text-base-content font-semibold ml-auto`}>₦{dispute?.trade?.rate && formatAsCurrency(dispute?.trade?.rate * dispute?.trade?.valueInUSD)}</dd>
              </div>

              <div className='flex items-center border-b py-3'>
                <dt className='font-medium text-base-content text-sm'>Card Type</dt>
                <dd className={`text-base-content font-semibold ml-auto capitalize`}>{dispute?.trade?.cardType}</dd>
              </div>
            </dl>
          </section>
        </section>

        <aside className='hidden lg:block lg:w-1/2 border border-purple-100 rounded-lg text-base-content bg-purple-50'>
          {(trade?.status === "ACCEPTED" || trade?.status === "DISPUTED") &&
            <ChatSection dispute={dispute} trade={trade}  messages={messages} />
          }
        </aside>
      </div>

    </>


  )
}