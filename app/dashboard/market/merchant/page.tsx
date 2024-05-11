
import { lusitana } from '@/app/ui/fonts';
import { MarketListItem } from '@/app/ui/listItems';
import { ArrowLongRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { auth } from '@/auth';
import moment from 'moment';
import formatAsCurrency from '@/app/lib/formatAsCurrency';
import { getOffersForMarket, getUserByEmail, getOfferById } from '@/app/lib/data';
import InitiateTradeModal from '../initiateTradeModal';

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Dashboard',
};


export default async function Page({searchParams}: {
  searchParams: {
    offerId: string
  }
}) {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email);
  const allOffers = await getOffersForMarket({ userId: user?.id, offerCategory: "merchant" });
  const offer = await getOfferById(searchParams?.offerId)
  return (
    <>
      <div className='flex flex-col grow h-auto overflow-hidden'>

        <header>
          <h1 className={`${lusitana.className} text-base-content text-2xl font-bold`}>
            Merchant MarketPlace
          </h1>

          <section className='flex flex-col rounded-xl py-3' style={{ width: "350px" }}>
            <div role="tablist" className="tabs tabs-lifted border-none">
              <Link role="tab" href="/dashboard/market/merchant"
                className={`tab text-xs uppercase border-none text-primary font-extrabold`}>
                Merchant
              </Link>
              <Link role="tab" href="/dashboard/market/seller"
                className={`tab text-xs uppercase border-none text-base-content`}>
                Seller
              </Link>
            </div>
          </section>
        </header>


        <div className="hidden lg:flex flex-col grow h-auto overflow-y-scroll bg-white opacity-85 w-full rounded mt-4 px-3">
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
              {allOffers?.map((item, index) => {
                return (
                  <tr key={item?.id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img className='rounded-full' src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt='placeholder user' />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{item?.user?.firstName} {item?.user?.lastName}</div>
                          <div className="text-xs opacity-50">{item?.user?.username || item?.user?.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className={`${lusitana.className} text-base-content font-semibold capitalize`}>
                      <span className='flex'>${formatAsCurrency(item?.minAmount)} <ArrowLongRightIcon className='w-5' /> ${formatAsCurrency(item?.maxAmount)}</span>  {item?.cardName}
                    </td>
                    <td className={`${lusitana.className} text-base-content font-semibold`}>N{formatAsCurrency(item?.rate)}</td>
                    <td>
                      <p>{item?.cardType}</p>
                      <p className="text-xs text-base-content opacity-60 mb-1">{moment(item?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
                    </td>
                    <td>
                      <Link href={`/dashboard/market/merchant?offerId=${item?.id}`}
                        className="btn btn-outline btn-sm text-xs h-10 px-6 rounded-lg border-none bg-accent text-white hover:bg-accent hover:text-white hover:border-none hover:shadow-none z-10">
                        Sell
                      </Link>
                    </td>
                  </tr>
                )
              })}

            </tbody>
          </table>
        </div>

        {searchParams?.offerId && <InitiateTradeModal offerId={searchParams?.offerId}/>}
                      

        <ul className='lg:hidden mt-4 grow overflow-y-auto pb-20'>
          <MarketListItem />
          <MarketListItem />
          <MarketListItem />
          <MarketListItem />
          <MarketListItem />
          <MarketListItem />
          <MarketListItem />
          <MarketListItem />
          <MarketListItem />
          <MarketListItem />
          <MarketListItem />
          <MarketListItem />
          <MarketListItem />
          <MarketListItem />
          <MarketListItem />
          <MarketListItem />
          <MarketListItem />
          <MarketListItem />
          <MarketListItem />
          <MarketListItem />
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