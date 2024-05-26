
import { lusitana } from '@/app/ui/fonts';
import {TradesCard} from '@/app/ui/listItems';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { getAllTrades } from '@/app/lib/data';
import { auth } from '@/auth';
import { getUserByEmail } from '@/app/lib/data';
import moment from 'moment';
import formatAsCurrency from '@/app/lib/formatAsCurrency';
import { getAllDisputes, getAllUsers } from '@/app/lib/data';
import Image from 'next/image';


import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Dashboard',
};


export default async function Page() {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email);
  const allDisputes = await getAllDisputes({});
  console.log("all Disputes", allDisputes)
  return (
    <>
      <div className='flex flex-col grow h-auto overflow-hidden'>
        <h1 className={`${lusitana.className} mb-4 text-base-content text-2xl font-bold`}>
          Disputes
        </h1>

        <div className="hidden lg:flex flex-col grow h-auto overflow-y-scroll bg-white opacity-85 w-full rounded">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Buyer</th>
                <th>Seller</th>
                <th>Transaction Amount</th>
                <th>Dispute Winner</th>
                <th>Status</th>
                <th>Date Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className='text-gray-950'>
              {allDisputes?.map( (dispute, index) =>{
                return(
                  <tr key={dispute?.id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <Image src="/avatar1.png" className='rounded-full' width={40} height={40} style={{width: "40px", height: "40px", objectFit: "contain" }} alt='avatar' />
                        </div>
                        <div>
                          <div className="font-bold capitalize">{dispute?.trade?.buyer?.firstName} {dispute?.trade?.buyer?.lastName}</div>
                          <div className="text-xs opacity-50">{dispute?.trade?.buyer?.username || dispute?.trade?.buyer?.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <Image src="/avatar1.png" className='rounded-full' width={40} height={40} style={{width: "40px", height: "40px", objectFit: "contain" }} alt='avatar' />
                        </div>
                        <div>
                          <div className="font-bold capitalize">{dispute?.trade?.seller?.firstName} {dispute?.trade?.seller?.lastName}</div>
                          <div className="text-xs opacity-50">{dispute?.trade?.seller?.username || dispute?.trade?.seller?.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-primary text-sm font-semibold mb-1 capitalize">₦{formatAsCurrency(dispute?.trade?.valueInUSD * dispute?.trade?.rate)}
                    </td>
                    <td className={`${lusitana.className} text-base-content font-semibold`}>
                      {dispute?.disputeWinnerId === dispute?.trade?.buyer?.id && `${dispute?.trade?.buyer?.firstName} ${dispute?.trade?.buyer?.lastName}`} 
                      {dispute?.disputeWinnerId === dispute?.trade?.seller?.id && `${dispute?.trade?.seller?.firstName} ${dispute?.trade?.seller?.lastName}`} 
                      {dispute?.disputeWinnerId === null && `---`} 
                    </td>
                    <td className={`text-base-content font-bold text-lg`}>
                      <span className="badge badge-ghost badge-success text-xs text-success">{dispute?.status}</span>
                    </td>
                    <td>
                      <p className="text-xs text-base-content opacity-60 mb-1">{moment(dispute?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
                    </td>
                    <td>
                      <Link href={`/dashboard/disputes/${dispute?.id}`} className="flex items-center text-accent p-2">view <ArrowRightIcon className='w-3 ml-2' /> </Link>
                    </td>
                  </tr>
                )
              })}
              
            </tbody>

          </table>
        </div>

        <ul className='mt-4 lg:hidden grow overflow-y-auto pb-20'>
          <TradesCard />
          <TradesCard />
          <TradesCard />
          <TradesCard />
          <TradesCard />
          <TradesCard />
          <TradesCard />
          <TradesCard />
          <TradesCard />
          <TradesCard />
          <TradesCard />
          <TradesCard />
          <TradesCard />
          <TradesCard />
          <TradesCard />
          <TradesCard />
          <TradesCard />
          <TradesCard />
          <TradesCard />
          <TradesCard />
        </ul>

      </div>
    </>


  )
}