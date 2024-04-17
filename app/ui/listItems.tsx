
import { ArrowUpRightIcon, ArrowDownLeftIcon } from "@heroicons/react/24/outline";
import { lusitana } from "./fonts";
import Link from "next/link";




export const TransactionCard = () =>{

  return(
  <Link className="flex align-middle border-b py-3" href="/dashboard/transactions/1">
    <button className="flex align-middle btn btn-circle btn-sm w-10 h-10 bg-base text-error"> <ArrowUpRightIcon className="w-3" /></button>
    <div className="ml-3">
      <p className="text-base-content font-semibold mb-1">Fund Transfer</p>
      <p className="text-[10px] text-base-content opacity-60">Apr 7th, 2024 15:57:22</p>
    </div>
    <div className="flex flex-col ml-auto">
      <span className={`${lusitana.className} text-base-content font-bold`}>₦450,000</span>
      <span className="badge badge-ghost badge-success text-[10px] text-success">Successful</span>
    </div>
  </Link>
  )
}

export const TradesCard = ({status = "credit"}) =>{

  return(
  <Link className="flex align-middle border-b py-3"  href={`/dashboard/trades/1`}>
    <div className="avatar-group -space-x-9 rtl:space-x-reverse">
      <div className="avatar" >
        <div className="w-12">
          <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
      <div className="avatar">
        <div className="w-12">
          <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
    </div>
    <div className="ml-3 flex flex-col justify-center">
      <p className="text-base-content font-semibold mb-1">$200 Sephora</p>
      <p className="text-xs text-base-content opacity-60">Apr 7th, 2024 15:57:22</p>
    </div>
    <div className="flex flex-col justify-center ml-auto">
      <span className={`${lusitana.className} text-base-content font-bold text-lg`}>₦1,200</span>
      <span className="badge badge-ghost badge-success text-[10px] text-success">Successful</span>
    </div>
  </Link>
  )
}

export const NotificationListItem = ({status = "credit"}) =>{

  return(
    <li className="flex flex-row items-center border-b py-3" >
      <button className="flex align-middle btn btn-circle btn-sm w-8 h-8 bg-base text-error"> <ArrowUpRightIcon className="w-3" /></button>
      <div className="mx-3 flex flex-col items-start gap-0 p-0">
        <p className="text-base-content font-semibold m-0">Withdrawal</p>
        <time className="text-[10px] text-base-content opacity-60"> Apr 17th, 2024 15:57:22</time>
      </div>
      <div className="flex flex-col items-end ml-auto gap-0 p-0">
        <span className={`${lusitana.className} text-base-content font-bold`}>₦1,200</span>
        <span className=" text-[10px] text-success">Successful</span>
      </div>
    </li>
  )
}

export const OffersListItem = () =>{

  return(
    <Link className="flex flex-row items-center border-b py-3" href="/dashboard/offers/1">
      <button className="flex align-middle btn btn-circle btn-sm w-8 h-8 bg-base text-error"> <ArrowUpRightIcon className="w-3" /></button>
      <div className="mx-3 flex flex-col items-start gap-0 p-0">
        <p className="text-base-content font-semibold m-0">$200 Sephora</p>
        <time className="text-[10px] text-base-content opacity-60"> Apr 17th, 2024 15:57:22</time>
      </div>
      <div className="flex flex-col items-end ml-auto gap-0 p-0">
        <span className={`${lusitana.className} text-base-content font-bold`}>₦1,200</span>
        <span className=" text-[10px] text-success">Successful</span>
      </div>
    </Link>
  )
}

export const MarketListItem = () =>{

  return(
    <Link className="flex flex-row items-center border-b py-3" href="/dashboard/trades/1">
    <div className="avatar" >
      <div className="w-12 rounded-full">
        <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
      </div>
    </div>
    <div className="ml-3 flex flex-col justify-center">
      <p className="text-base-content font-semibold mb-1 text-sm">$200 Sephora</p>
      <time className="text-xs text-gray-500 text-[10px]">Apr 7th, 2024 15:57:22</time>
    </div>
    <div className="flex flex-col justify-center ml-auto">
      <span className={`${lusitana.className} text-base-content font-bold`}>₦1,200</span>
      <span className="text-[10px] text-success">Successful</span>
    </div>
    </Link>
  )
}
