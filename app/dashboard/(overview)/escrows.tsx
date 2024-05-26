import { lusitana } from '@/app/ui/fonts';
import WalletCard from '@/app/ui/dashboard/walletCard';
import Tabs from '@/app/ui/dashboard/tabs';
import {EscrowsCard} from '@/app/ui/listItems';
import { ArrowLongRightIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { Metadata } from 'next';
import Link from 'next/link';
import { getAllEscrows } from '@/app/lib/data';
import { auth } from '@/auth';
import { getUserByEmail } from '@/app/lib/data';
import moment from 'moment';
import formatAsCurrency from '@/app/lib/formatAsCurrency';
import Image from 'next/image';



const Escrows = async() =>{
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email);
  const allEscrows = user?.role === "USER" ? await getAllEscrows(user?.id) : await getAllEscrows();
  return (
    <div className="hidden lg:flex flex-col grow h-auto overflow-y-scroll bg-white opacity-85 w-full rounded">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Seller</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className='text-gray-950'>
              {allEscrows.map( (item, index) => {
                return(
                  <tr key={item?.id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <Image src="/avatar1.png" className='rounded-full' width={40} height={40} style={{width: "40px", height: "40px", objectFit: "contain" }} alt='avatar' />
                        </div>
                        <div>
                          <div className="font-bold capitalize">{item?.trade?.seller?.firstName} {item?.trade?.seller?.lastName}</div>
                          <div className="text-xs opacity-50">{item?.trade?.seller?.username || item?.trade?.seller?.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className={`${lusitana.className} text-base-content font-semibold`}>₦{formatAsCurrency(item?.amount)}</td>
                    <td className={`text-base-content font-bold text-lg`}>
                      <span className="badge badge-ghost badge-success text-xs text-success">{item?.status}</span>
                    </td>
                    <td>
                      <p className="text-xs text-base-content opacity-60 mb-1">{moment(item?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
                    </td>
                    <td>
                      <Link href={`/dashboard/escrows/${item?.id}`} className="flex items-center text-accent p-2">view <ArrowRightIcon className='w-3 ml-2' /> </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>

          </table>
        </div>
  )
}

export default Escrows;