
import { lusitana } from '@/app/ui/fonts';
import {MarketListItem} from '@/app/ui/listItems';
import { ArrowLongRightIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { getOffersForMarket, getUserByEmail, getOfferById } from '@/app/lib/data';
import { Metadata } from 'next';
import Link from 'next/link';
import { auth } from '@/auth';
import moment from 'moment';
import formatAsCurrency from '@/app/lib/formatAsCurrency';
import InitiateTradeModal from '../initiateTradeModal';
import Image from 'next/image';

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
  const allOffers = await getOffersForMarket({ userId: user?.id, offerCategory: "seller" });
  const offer = await getOfferById(searchParams?.offerId)
  return (
    <>
      <div className='flex flex-col grow h-auto overflow-hidden'>


        <header>
          <h1 className={`${lusitana.className} text-base-content text-2xl font-bold`}>
            Seller MarketPlace
          </h1>

          <section className='flex flex-col rounded-xl py-3' style={{ width: "350px" }}>
            <div role="tablist" className="tabs tabs-lifted border-none">
              <Link role="tab" href="/dashboard/market/merchant"
                className={`tab text-xs uppercase border-none text-base-content  `}>
                Merchant
              </Link>
              <Link role="tab" href="/dashboard/market/seller"
                className={`tab text-xs uppercase border-none text-primary font-extrabold`}>
                Seller
              </Link>
            </div>
          </section>
        </header>

        <div className="hidden lg:flex flex-col grow h-auto overflow-y-scroll bg-white opacity-85 w-full rounded mt-4">
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
              {allOffers?.map((item, index) => {
                return (
                  <tr key={item?.id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <Image src="/avatar1.png" className='rounded-full' width={40} height={40} style={{width: "40px", height: "40px", objectFit: "contain" }} alt='avatar' />
                        </div>
                        <div>
                          <div className="font-bold">{item?.user?.firstName} {item?.user?.lastName}</div>
                          <div className="text-xs opacity-50">{item?.user?.username || item?.user?.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className={`${lusitana.className} text-base-content font-semibold capitalize`}>${item?.valueInUSD} {item?.cardName}</td>
                    <td className={`${lusitana.className} text-base-content font-semibold`}>N{formatAsCurrency(item?.rate)}</td>
                    <td>
                      <p className='capitalize'>{item?.cardType}</p>
                      <p className="text-xs text-base-content opacity-60 mb-1">{moment(item?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
                    </td>
                    <td>
                      {/* <InitiateTradeModal offer={offer} id={item?.id} user={user} category="seller"  /> */}
                      <Link href={`/dashboard/market/seller?offerId=${item?.id}`}
                        className="btn btn-outline btn-sm text-xs h-10 px-6 rounded-lg border-none bg-primary text-white hover:bg-primary hover:text-white hover:border-none hover:shadow-none z-10">
                        Buy
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
        </ul>

      </div>
    </>


  )
}