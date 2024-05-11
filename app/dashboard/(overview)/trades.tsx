
import { lusitana } from '@/app/ui/fonts';
import {TradesCard} from '@/app/ui/listItems';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { getAllTrades } from '@/app/lib/data';
import { auth } from '@/auth';
import { getUserByEmail } from '@/app/lib/data';
import moment from 'moment';
import Link from 'next/link';


const Trades = async() =>{
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email);
  const allTrades = await getAllTrades({userId: user?.id});

  return(
    <div className="hidden lg:flex flex-col grow h-auto overflow-y-scroll bg-white opacity-85 w-full rounded">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Buyer</th>
                <th>Seller</th>
                <th>Card Name</th>
                <th>Rate</th>
                <th>Status</th>
                <th>Date Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className='text-gray-950'>
              {allTrades?.map( (trade, index) =>{
                return(
                  <tr key={trade?.id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img className='rounded-full' src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt='placeholder user' />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold capitalize">{trade?.buyer?.firstName} {trade?.buyer?.lastName}</div>
                          <div className="text-xs opacity-50">{trade?.buyer?.username || trade?.buyer?.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img className='rounded-full' src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt='placeholder user' />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold capitalize">{trade?.seller?.firstName} {trade?.seller?.lastName}</div>
                          <div className="text-xs opacity-50">{trade?.seller?.username || trade?.seller?.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-primary text-sm font-semibold mb-1 capitalize">${trade?.valueInUSD} {trade?.cardName}</td>
                    <td className={`${lusitana.className} text-base-content font-semibold`}>₦{trade?.rate}</td>
                    <td className={`text-base-content font-bold text-lg`}>
                      <span className="badge badge-ghost badge-success text-xs text-success">{trade?.status}</span>
                    </td>
                    <td>
                      <p className="text-xs text-base-content opacity-60 mb-1">{moment(trade?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
                    </td>
                    <td>
                      <Link href={`/dashboard/trades/${trade?.id}`} className="flex items-center text-accent p-2">view <ArrowRightIcon className='w-3 ml-2' /> </Link>
                    </td>
                  </tr>
                )
              })}
              
            </tbody>

          </table>
        </div>
  )
}


export default Trades