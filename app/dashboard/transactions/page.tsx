
import { lusitana } from '@/app/ui/fonts';
import WalletCard from '@/app/ui/dashboard/walletCard';
import Tabs from '@/app/ui/dashboard/tabs';
import { TransactionCard } from '@/app/ui/listItems';
import { ArrowUpRightIcon, ArrowDownLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { auth } from '@/auth';
import { getUserByEmail } from '@/app/lib/data';
import { getAllTransactions } from '@/app/lib/data';
import { Metadata } from 'next';
import Link from 'next/link';
import formatAsCurrency from '@/app/lib/formatAsCurrency';
import moment from 'moment';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Dashboard',
};


export default async function Page() {
  const sesssion = await auth();
  const user = await getUserByEmail(sesssion?.user?.email);
  const transactions = await getAllTransactions({ userId: user?.id })
  console.log(transactions);
  return (
    <>
      <div className='hidden md:flex md:flex-col grow h-auto overflow-hidden'>
        <h1 className={`${lusitana.className} mb-4 text-base-content text-2xl font-bold`}>
          Transactions
        </h1>

        <div className="hidden lg:flex lg:flex-col grow h-auto overflow-y-scroll bg-white opacity-85 w-full rounded">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Category</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Status / Date</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className='text-gray-950'>
              {transactions?.map((item) => {
                return (
                  <tr key={item?.id}>
                    <td>
                      <button className="flex align-middle btn btn-circle btn-sm w-10 h-10 bg-base text-error">
                        {item?.type === "DEBIT" && <ArrowUpRightIcon className="w-4" />}
                        {item?.type === "CREDIT" && <ArrowDownLeftIcon className="w-4" />}
                      </button>
                    </td>
                    <td className="text-base-content font-semibold mb-1">{item?.category}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <Image src="/avatar1.png" className='rounded-full' width={40} height={40} style={{width: "40px", height: "40px", objectFit: "contain" }} alt='avatar' />
                        </div>
                        <div>
                          <div className="font-bold">Hart Hagerty</div>
                          <div className="text-xs opacity-50">user@exampleemail.com</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <Image src="/avatar1.png" className='rounded-full' width={40} height={40} style={{width: "40px", height: "40px", objectFit: "contain" }} alt='avatar' />
                        </div>
                        <div>
                          <div className="font-bold">Hart Hagerty</div>
                          <div className="text-xs opacity-50">user@exampleemail.com</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-ghost badge-success text-xs mb-1 text-success">{item?.status}</span>
                      <p className="text-xs text-base-content opacity-60">{moment(item?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
                    </td>
                    <td className={`${lusitana.className} text-base-content font-bold text-lg`}>₦{formatAsCurrency(item?.amount)}</td>
                    <th>
                      <Link href={`/dashboard/transactions/${item?.id}`} className="flex items-center text-accent p-2">view <ArrowRightIcon className='w-3 ml-2' /> </Link>
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
          Transactions
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