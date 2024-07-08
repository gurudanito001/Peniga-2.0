import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { RevenueChartSkeleton, LatestInvoicesSkeleton, CardsSkeleton } from '@/app/ui/skeletons';
import CardWrapper from '@/app/ui/dashboard/cards';
import WalletCard from '@/app/ui/dashboard/walletCard';
import Tabs from '@/app/ui/dashboard/tabs';
import { TransactionCard } from '@/app/ui/listItems';
import { ArrowUpRightIcon, ArrowDownLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import CreateWallet from './createWallet';
import { auth } from '@/auth';
import { getUserByEmail, getAllTransactions } from '@/app/lib/data';
import type { User } from '@prisma/client';
import moment from 'moment';
import { Metadata } from 'next';
import Link from 'next/link';
import formatAsCurrency from '@/app/lib/formatAsCurrency';
import Image from 'next/image';

const Transactions = async()=>{
  const sesssion = await auth();
  const user = await getUserByEmail(sesssion?.user?.email);
  const transactions = await getAllTransactions({userId: user?.id});
  /* const transactions = user?.role === "USER" ? 
  await fetchTransactions({accountNuber: user?.wallet?.walletData?.accountNumber, pageNo: 0, pageSize: 10}) :
  await fetchTransactions({pageNo: 0, pageSize: 20})
  console.log("all transactions", transactions); */


  return (
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
                <td className="text-base-content font-semibold mb-1">Fund Transfer</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-10 rounded-full">
                        <Image src="/avatar1.png" className='rounded-full' width={40} height={40} style={{ width: "40px", height: "40px", objectFit: "contain" }} alt='avatar' />
                      </div>
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
                      <div className="w-10 rounded-full">
                        <Image src="/avatar1.png" className='rounded-full' width={40} height={40} style={{ width: "40px", height: "40px", objectFit: "contain" }} alt='avatar' />
                      </div>
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
                  <Link href="/dashboard/transactions/1" className="flex items-center text-accent p-2">view <ArrowRightIcon className='w-3 ml-2' /> </Link>
                </th>
              </tr>
            )
          })}

        </tbody>

      </table>

    </div>
  )
}

export default Transactions