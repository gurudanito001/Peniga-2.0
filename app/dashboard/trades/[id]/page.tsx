
import { lusitana } from '@/app/ui/fonts';
import { TransactionCard } from '@/app/ui/listItems';
import { ArrowLongRightIcon, ArrowDownLeftIcon, ArrowRightIcon, PhotoIcon, PaperAirplaneIcon, ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';
import ModalTemplate from '@/app/ui/dashboard/modalTemplate';
import ChatSection from './chatSection';
import { getTradeById, getMessages, getUserByEmail, getTempAccount } from '@/app/lib/data';
import { auth } from '@/auth';
import { Metadata } from 'next';
import Link from 'next/link';
import formatAsCurrency from '@/app/lib/formatAsCurrency';
import moment from 'moment';
import { acceptTrade } from '@/app/lib/actions';
import Image from 'next/image';
import EscrowModal from './escrowModal';





export const metadata: Metadata = {
  title: 'Dashboard',
};


export default async function Page({ params }: any) {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email);
  const trade = await getTradeById(params?.id);
  const tempAccount = await getTempAccount(params?.id);
  const messages = await getMessages(params?.id);
  console.log(messages);


  const deriveEscrowPaymentDetails = ()=>{
    let details = {
      totalEscrowPayment: 0, 
      expectedAmount: (trade?.rate && trade?.valueInUSD) ? (trade?.rate * trade?.valueInUSD) : 0, 
      balance: (trade?.rate && trade?.valueInUSD) ? (trade?.rate * trade?.valueInUSD) : 0
    };
    if(trade && trade?.escrow){
      details.totalEscrowPayment = trade?.escrow?.amount,
      details.expectedAmount = trade?.rate * trade?.valueInUSD,
      details.balance = (trade?.rate * trade?.valueInUSD) - (trade?.escrow?.amount || 0) 
    }
    console.log("escrowPaymentDetails", details)
    return details
  }
  return (
    <>

      <div className='flex grow h-auto overflow-hidden w-full'>
        <section className='w-full lg:w-3/5 h-auto overflow-y-auto pb-20 lg:pb-0'>
          <header className='max-w-xl'>
            <h1 className={`${lusitana.className} text-base-content text-2xl font-bold`}>
              View Trade
            </h1>
            <div className='flex items-center'>
              <div className="text-sm breadcrumbs">
                <ul>
                  <li className='text-base-content'><Link href="/dashboard/trades">List Trades</Link></li>
                  <li className='text-primary font-bold'><Link href={`/dashboard/trades/${params.id}`}>View Trade</Link></li>
                </ul>
              </div>


              {(trade?.status === "ACCEPTED" || trade?.status === "DISPUTED") &&
                <div className="drawer drawer-end w-24 ml-auto z-10">
                  <input id="trade-chat-drawer" type="checkbox" className="drawer-toggle" />
                  <div className='z-10 flex'>
                    {/* Page content here */}
                    <label htmlFor="trade-chat-drawer" className="btn btn-sm bg-primary glass drawer-button gap-0 text-white ml-auto lg:hidden">
                      <ChatBubbleOvalLeftEllipsisIcon className='w-5 ' />
                      <span className='ml-1 text-xs'>Chat</span>
                    </label>
                  </div>
                  <div className="drawer-side z-50">
                    <label htmlFor="trade-chat-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-0 w-[375px] h-full  text-base-content bg-base">
                      <ChatSection trade={trade} userId={user?.id} messages={messages} />
                    </ul>
                  </div>
                </div>}

            </div>
          </header>

          <section className='bg-neutral max-w-xl p-3 md:p-5 rounded-lg mt-5'>
            <dl className='text-base-content'>

              <div className='flex items-center border-b py-3'>
                <dt className='font-medium text-base-content text-sm'>Buyer</dt>
                <dd className='ml-auto'>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <Image src="/avatar1.png" className='rounded-full' width={40} height={40} style={{ width: "40px", height: "40px", objectFit: "contain" }} alt='avatar' />
                    </div>
                    <div>
                      <div className="font-bold capitalize">{trade?.buyer?.firstName} {trade?.buyer?.lastName}</div>
                      <div className="text-xs opacity-50">{trade?.buyer?.username || trade?.buyer?.email}</div>
                    </div>
                  </div>
                </dd>
              </div>

              <div className='flex items-center border-b py-3'>
                <dt className='font-medium text-base-content text-sm'>Seller</dt>
                <dd className='ml-auto'>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <Image src="/avatar1.png" className='rounded-full' width={40} height={40} style={{ width: "40px", height: "40px", objectFit: "contain" }} alt='avatar' />
                    </div>
                    <div>
                      <div className="font-bold capitalize">{trade?.seller?.firstName} {trade?.seller?.lastName}</div>
                      <div className="text-xs opacity-50">{trade?.seller?.username || trade?.seller?.email}</div>
                    </div>
                  </div>
                </dd>
              </div>

              <div className='flex items-center border-b py-3'>
                <dt className='font-medium text-base-content text-sm'>Card Name</dt>
                <dd className={`text-base-content font-semibold ml-auto`}>${formatAsCurrency(trade?.valueInUSD)} {trade?.cardName}</dd>
              </div>

              <div className='flex items-center border-b py-3'>
                <dt className='font-medium text-base-content text-sm'>Rate</dt>
                <dd className={`${lusitana.className} text-base-content font-semibold ml-auto`}>₦{formatAsCurrency(trade?.rate)}</dd>
              </div>

              <div className='flex items-center border-b py-3'>
                <dt className='font-medium text-base-content text-sm'>Transaction Amount</dt>
                <dd className={`${lusitana.className} text-base-content font-semibold ml-auto`}>₦{trade?.rate && formatAsCurrency(trade?.rate * trade?.valueInUSD)}</dd>
              </div>

              <div className='flex items-center border-b py-3'>
                <dt className='font-medium text-base-content text-sm'>Card Type</dt>
                <dd className={`text-base-content font-semibold ml-auto capitalize`}>{trade?.cardType}</dd>
              </div>

              <div className='flex items-center border-b py-3'>
                <dt className='font-medium text-base-content text-sm'>Giftcard Sent</dt>
                <dd className={`text-base-content font-semibold ml-auto capitalize`}>{trade?.giftCardSent ? "Yes" : "No"}</dd>
              </div>

              <div className='flex items-center border-b py-3'>
                <dt className='font-medium text-base-content text-sm'>Giftcard Sent Time</dt>
                <dd className={`text-base-content font-semibold ml-auto capitalize`}>{trade?.timeSent ? moment(trade?.timeSent).format('MMMM Do YYYY, h:mm:ss a') : "-------"}</dd>
              </div>

              <div className='flex items-center border-b py-3'>
                <dt className='font-medium text-base-content text-sm'>Status</dt>
                <dd className={`text-base-content font-semibold ml-auto`}>
                  <span className="badge badge-ghost badge-success text-xs text-success">{trade?.status}</span>
                </dd>
              </div>

              <div className='flex items-center border-b py-3'>
                <dt className='font-medium text-base-content text-sm'>Escrow</dt>
                <dd className={`text-base-content font-semibold ml-auto`}>
                  {trade?.escrow ?
                    <Link href={`/dashboard/escrows/${trade?.escrow?.id}`} className="flex items-center text-accent p-2">view <ArrowRightIcon className='w-3 ml-2' /> </Link>
                    : "none"}
                </dd>
              </div>

              <div className='flex items-center border-b py-3'>
                <dt className='font-medium text-base-content text-sm'>Dispute</dt>
                <dd className={`text-base-content font-semibold ml-auto`}>
                  {trade?.dispute ?
                    <Link href={`/dashboard/dispute/${trade?.dispute?.id}`} className="flex items-center text-accent p-2">view <ArrowRightIcon className='w-3 ml-2' /> </Link>
                    : "none"}
                </dd>
              </div>

              <div className='flex items-center py-3'>
                <dt className='font-medium text-base-content text-sm'>Date Created</dt>
                <dd className={`text-base-content font-semibold ml-auto`}>
                  <p className="text-xs text-base-content opacity-60">{moment(trade?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
                </dd>
              </div>
            </dl>
          </section>

          {trade?.userId !== user?.id && (trade?.status === "PENDING") &&
            <section className='bg-neutral max-w-xl p-3 md:p-5 mb-5 rounded-lg mt-5 flex items-center'>
              <ModalTemplate
                modalId='acceptTradeModal'
                heading='Accept Trade Request'
                description='Are you sure you want to accept this trade request'
                btnClasses='btn text-white rounded-lg bg-green-700 shadow-lg  hover:bg-green-800 hover:shadow-none glass px-12 md:px-20'
                btnText="Accept"
                onSubmit={acceptTrade}
                id={trade?.id}
              />

              <ModalTemplate
                modalId='declineTradeModal'
                heading='Decline Trade Request'
                description='Are you sure you want to decline this trade request'
                btnClasses='btn text-white rounded-lg bg-yellow-600 shadow-lg hover:bg-yellow-700 hover:shadow-none glass px-12 md:px-20 ml-auto'
                btnText="Decline"
                onSubmit={acceptTrade}
                id={trade?.id}
              />
            </section>}

        </section>


        <aside className='hidden lg:block lg:w-2/5 border border-purple-100 rounded-lg text-base-content bg-purple-50'>
          {((trade?.status === "ACCEPTED" || trade?.status === "DISPUTED") && (deriveEscrowPaymentDetails().balance <= 0) ) &&
            <ChatSection trade={trade} userId={user?.id} messages={messages} />
          }
        </aside>
        { deriveEscrowPaymentDetails().balance > 0 && 
        <EscrowModal userType={trade?.buyerId === user?.id ? "buyer" : "seller"} user={trade?.buyerId === user?.id ? trade?.buyer : trade?.seller} trade={trade} tempAccount={tempAccount} escrowPaymentDetails={deriveEscrowPaymentDetails()} />}
      </div>

    </>


  )
}