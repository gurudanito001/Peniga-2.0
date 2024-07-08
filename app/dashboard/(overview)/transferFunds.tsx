"use client"

import { XMarkIcon, HomeModernIcon, IdentificationIcon, BanknotesIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";
import TransferFundsForm from "./transferFundsForm";
import { useRef } from "react";




const TransferFunds = ({ banks }: { banks: any[] }) => {
  const transferFundsRef = useRef(null);
  return (
    <>
      <button className={`btn text-white rounded-lg hidden`} onClick={() => {
        const el = document?.getElementById(`transferFunds-drawer`) as HTMLDialogElement;
        el?.click()
      }}>Redeem Payment</button>
    
      <div className="drawer drawer-end w-9 ml-auto z-10">
        <input id="transferFunds-drawer" type="checkbox" className="drawer-toggle" />
        <div>
          <label htmlFor="transferFunds-drawer" className="btn btn-circle btn-sm btn-outline glass drawer-button text-gray-950 align-middle hidden">
          </label>
        </div>
        <div className="drawer-side z-30">
          <label htmlFor="transferFunds-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <div className="menu p-4 w-[350px] lg:w-[400px] min-h-full flex flex-col text-base-content rounded-xl bg-base">
            <header className="flex items-center">
              <h4 className={`${lusitana.className} text-2xl font-bold`}>Transfer to Bank Account</h4>
              <label htmlFor="transferFunds-drawer" className="btn btn-circle btn-sm ml-auto">
                <XMarkIcon className="w-4" />
              </label>
            </header>
            <section className="h-auto w-full grow mt-16">
              <TransferFundsForm banks={banks} />
            </section>
          </div>
        </div>
      </div>
    </>
  )
}

export default TransferFunds;