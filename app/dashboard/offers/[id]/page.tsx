
import { lusitana } from '@/app/ui/fonts';
import { ArrowLongRightIcon } from '@heroicons/react/24/outline';
import EditOfferModal from './editOfferModal';
import { getOfferById } from '@/app/lib/data';
import { Metadata } from 'next';
import Link from 'next/link';
import formatAsCurrency from '@/app/lib/formatAsCurrency';
import moment from "moment"

export const metadata: Metadata = {
  title: 'Dashboard',
};


export default async function Page({ params }: { params: { id: string } }) {
  const offer = await getOfferById(params?.id);
  console.log(offer);

  return (
    <>
      <div className='flex flex-col grow h-auto overflow-y-auto pb-20 lg:pb-0'>
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
            <EditOfferModal offer={offer} />
          </div>
          
        </header>

        {offer &&
        <section className='bg-neutral max-w-xl p-5 rounded-lg mt-5'>
          <dl className='text-base-content'>
            <div className='flex items-center border-b py-3'>
              <dt className='font-medium text-base-content text-sm'>Card Name</dt>
              <dd className={`text-base-content font-semibold ml-auto capitalize`}>{offer?.cardName}</dd>
            </div>

            <div className='flex items-center border-b py-3'>
              <dt className='font-medium text-base-content text-sm'>Card Type</dt>
              <dd className={`text-base-content font-semibold ml-auto capitalize`}>{offer?.cardType}</dd>
            </div>

            <div className='flex items-center border-b py-3'>
              <dt className='font-medium text-base-content text-sm'>Rate</dt>
              <dd className={`${lusitana.className} text-base-content font-semibold ml-auto`}>₦{formatAsCurrency(offer?.rate)}</dd>
            </div>

            
            <div className='flex items-center border-b py-3'>
              <dt className='font-medium text-base-content text-sm'>Range</dt>
              <dd className={`${lusitana.className} text-base-content font-semibold ml-auto`}>
              {offer?.offerCategory === "merchant" ?
                <span className='flex'>${formatAsCurrency(offer?.minAmount)} <ArrowLongRightIcon className='w-5' /> ${formatAsCurrency(offer?.maxAmount)}</span> :
                <span>{formatAsCurrency(offer?.valueInUSD)}</span>
              }
              </dd>
            </div>

            <div className='flex items-center border-b py-3'>
              <dt className='font-medium text-base-content text-sm'>Category</dt>
              <dd className={`text-base-content font-semibold ml-auto capitalize`}>{offer?.offerCategory}</dd>
            </div>

            <div className='flex items-center border-b py-3'>
              <dt className='font-medium text-base-content text-sm'>Status</dt>
              <dd className={`text-base-content font-semibold ml-auto`}>
                <span className="badge badge-ghost badge-success text-xs text-success">{offer?.status}</span>
              </dd>
            </div>

            <div className='flex items-center py-3'>
              <dt className='font-medium text-base-content text-sm'>Date Created</dt>
              <dd className={`text-base-content font-semibold ml-auto`}>
                <p className="text-xs text-base-content opacity-60">{moment(offer?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
              </dd>
            </div>

          </dl>
        </section>}
      </div>
    </>


  )
}