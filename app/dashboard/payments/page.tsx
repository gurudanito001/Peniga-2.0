
import { lusitana } from '@/app/ui/fonts';
import { TransactionCard } from '@/app/ui/listItems';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { auth } from '@/auth';
import { getUserByEmail } from '@/app/lib/data';
import { getAllPayments } from '@/app/lib/data';
import { Metadata } from 'next';
import Link from 'next/link';
import formatAsCurrency from '@/app/lib/formatAsCurrency';
import moment from 'moment';

export const metadata: Metadata = {
  title: 'Dashboard',
};


export default async function Page() {
  const sesssion = await auth();
  const user = await getUserByEmail(sesssion?.user?.email);
  const payments = await getAllPayments({ ...(user?.role === "USER" && {userId: user?.id})})
  console.log(payments);
  return (
    <>
      <div className='hidden md:flex md:flex-col grow h-auto overflow-hidden'>
        <h1 className={`${lusitana.className} mb-4 text-base-content text-2xl font-bold`}>
          Payments
        </h1>

        <div className="hidden lg:flex lg:flex-col grow h-auto overflow-y-scroll bg-white opacity-85 w-full rounded">
          <table className="table">
            <thead>
              <tr>
                <th>Amount</th>
                <th>Category</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className='text-gray-950'>
              {payments?.map((item) => {
                return (
                  <tr key={item?.id}>
                    <td className={`${lusitana.className} text-base-content font-bold text-lg`}>₦{formatAsCurrency(item?.amount)}</td>
                    <td className="text-base-content font-semibold mb-1">{item?.category}</td>
                    <td>
                      <span className="badge badge-ghost badge-success text-xs mb-1 text-success">{item?.status}</span>
                    </td>
                    <td>
                      <p className="text-xs text-base-content opacity-60">{moment(item?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
                    </td>
                    <th>
                      <Link href={`/dashboard/payments/${item?.id}`} className="flex items-center text-accent p-2">view <ArrowRightIcon className='w-3 ml-2' /> </Link>
                    </th>
                  </tr>
                )
              })}

            </tbody>

          </table>

        </div>
      </div>

      <div className="flex md:hidden grow flex-col text-sm overflow-y-auto pb-20">
        <h1 className={`${lusitana.className} mb-4 text-base-content text-xl font-bold`}>
          Payments
        </h1>
        <ul className='mt-4 grow overflow-y-auto'>
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />

        </ul>
      </div>
    </>


  )
}