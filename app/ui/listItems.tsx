
import { ArrowUpRightIcon, ArrowDownLeftIcon } from "@heroicons/react/24/outline";
import { lusitana } from "./fonts";




export const TransactionCard = ({status = "credit"}) =>{

  return(
  <li className="flex align-middle border-b py-3">
    <button className="flex align-middle btn btn-circle btn-sm w-10 h-10 bg-base text-error"> <ArrowUpRightIcon className="w-4" /></button>
    <div className="ml-3">
      <p className="text-base-content font-semibold mb-1">Fund Transfer</p>
      <p className="text-xs text-base-content opacity-60">Apr 7th, 2024 15:57:22</p>
    </div>
    <div className="flex flex-col ml-auto">
      <span className={`${lusitana.className} text-base-content font-bold text-lg`}>₦450,000</span>
      <span className="badge badge-ghost badge-success text-xs text-success">Successful</span>
    </div>
  </li>
  )
}

export const TradesCard = ({status = "credit"}) =>{

  return(
  <li className="flex align-middle border-b py-3">
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
      <span className="badge badge-ghost badge-success text-xs text-success">Successful</span>
    </div>
  </li>
  )
}

