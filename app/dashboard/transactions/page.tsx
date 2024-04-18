
import { lusitana } from '@/app/ui/fonts';
import WalletCard from '@/app/ui/dashboard/walletCard';
import Tabs from '@/app/ui/dashboard/tabs';
import {TransactionCard} from '@/app/ui/listItems';
import { ArrowUpRightIcon, ArrowDownLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Dashboard',
};


export default async function Page() {
  return (
    <>
      <div className='hidden md:flex md:flex-col grow h-auto overflow-hidden'>
        <h1 className={`${lusitana.className} mb-4 text-base-content text-2xl font-bold`}>
          Transactions
        </h1>

        <div className="flex flex-col grow h-auto overflow-y-scroll bg-white opacity-85 w-full rounded">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Status</th>
                <th>Date Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className='text-gray-950'>
              <tr>
                <td>
                  <button className="flex align-middle btn btn-circle btn-xs w-7 h-7 bg-base text-success"> <ArrowDownLeftIcon className="w-4" /></button>
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img className='rounded-full' src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt='placeholder user' />
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
                      <div className="mask mask-squircle w-12 h-12">
                        <img className='rounded-full' src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt='placeholder user' />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">Hart Hagerty</div>
                      <div className="text-xs opacity-50">user@exampleemail.com</div>
                    </div>
                  </div>
                </td>
                <td className={`${lusitana.className} text-base-content font-semibold`}>₦850</td>
                <td className={`text-base-content font-semibold`}>Fund Account</td>
                <td className={`text-base-content font-bold text-lg`}>
                  <span className="badge badge-ghost badge-success text-xs text-success">Successful</span>
                </td>
                <td>
                  <p className="text-xs text-base-content opacity-60">Apr 7th, 2024 15:57:22</p>
                </td>
                <td>
                  <Link href="/dashboard/transactions/1" className="flex items-center text-accent p-2">view <ArrowRightIcon className='w-3 ml-2' /> </Link>
                </td>
              </tr>
              <tr>
                <td>
                  <button className="flex align-middle btn btn-circle btn-xs w-7 h-7 bg-base text-success"> <ArrowDownLeftIcon className="w-4" /></button>
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img className='rounded-full' src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt='placeholder user' />
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
                      <div className="mask mask-squircle w-12 h-12">
                        <img className='rounded-full' src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt='placeholder user' />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">Hart Hagerty</div>
                      <div className="text-xs opacity-50">user@exampleemail.com</div>
                    </div>
                  </div>
                </td>
                <td className={`${lusitana.className} text-base-content font-semibold`}>₦850</td>
                <td className={`text-base-content font-semibold`}>Fund Account</td>
                <td className={`text-base-content font-bold text-lg`}>
                  <span className="badge badge-ghost badge-success text-xs text-success">Successful</span>
                </td>
                <td>
                  <p className="text-xs text-base-content opacity-60">Apr 7th, 2024 15:57:22</p>
                </td>
                <td>
                  <Link href="/dashboard/transactions/1" className="flex items-center text-accent p-2">view <ArrowRightIcon className='w-3 ml-2' /> </Link>
                </td>
              </tr>
              <tr>
                <td>
                  <button className="flex align-middle btn btn-circle btn-xs w-7 h-7 bg-base text-success"> <ArrowDownLeftIcon className="w-4" /></button>
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img className='rounded-full' src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt='placeholder user' />
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
                      <div className="mask mask-squircle w-12 h-12">
                        <img className='rounded-full' src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt='placeholder user' />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">Hart Hagerty</div>
                      <div className="text-xs opacity-50">user@exampleemail.com</div>
                    </div>
                  </div>
                </td>
                <td className={`${lusitana.className} text-base-content font-semibold`}>₦850</td>
                <td className={`text-base-content font-semibold`}>Fund Account</td>
                <td className={`text-base-content font-bold text-lg`}>
                  <span className="badge badge-ghost badge-success text-xs text-success">Successful</span>
                </td>
                <td>
                  <p className="text-xs text-base-content opacity-60">Apr 7th, 2024 15:57:22</p>
                </td>
                <td>
                  <Link href="/dashboard/transactions/1" className="flex items-center text-accent p-2">view <ArrowRightIcon className='w-3 ml-2' /> </Link>
                </td>
              </tr>
              <tr>
                <td>
                  <button className="flex align-middle btn btn-circle btn-xs w-7 h-7 bg-base text-success"> <ArrowDownLeftIcon className="w-4" /></button>
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img className='rounded-full' src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt='placeholder user' />
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
                      <div className="mask mask-squircle w-12 h-12">
                        <img className='rounded-full' src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt='placeholder user' />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">Hart Hagerty</div>
                      <div className="text-xs opacity-50">user@exampleemail.com</div>
                    </div>
                  </div>
                </td>
                <td className={`${lusitana.className} text-base-content font-semibold`}>₦850</td>
                <td className={`text-base-content font-semibold`}>Fund Account</td>
                <td className={`text-base-content font-bold text-lg`}>
                  <span className="badge badge-ghost badge-success text-xs text-success">Successful</span>
                </td>
                <td>
                  <p className="text-xs text-base-content opacity-60">Apr 7th, 2024 15:57:22</p>
                </td>
                <td>
                  <Link href="/dashboard/transactions/1" className="flex items-center text-accent p-2">view <ArrowRightIcon className='w-3 ml-2' /> </Link>
                </td>
              </tr>
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