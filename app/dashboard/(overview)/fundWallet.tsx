"use client"

import { XMarkIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";
import { useRef } from "react";



const FundWallet = ({  walletData, btnRef }: { btnRef: any,  walletData: { accountName: string, accountNumber: string } }) => {
  //const btnRef: any = useRef("fundWallet")
  const copyToClipboard = (text: string) => navigator.clipboard.writeText(text);


  return (
    <div className="drawer drawer-end w-9 ml-auto z-10">
      <input id="fundWallet-drawer" type="checkbox" className="drawer-toggle" />
      <div>
        <label ref={btnRef} htmlFor="fundWallet-drawer" className="btn btn-circle btn-sm btn-outline glass drawer-button text-gray-950 align-middle hidden">
        </label>
      </div>
      <div className="drawer-side z-30">
        <label htmlFor="fundWallet-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="menu p-4 w-[350px] lg:w-[400px] min-h-full flex flex-col text-base-content rounded-xl bg-base">
          <header className="flex items-center">
            <h4 className={`${lusitana.className} text-2xl font-bold`}>Fund Wallet</h4>
            <label htmlFor="fundWallet-drawer" className="btn btn-circle btn-sm ml-auto">
              <XMarkIcon className="w-4" />
            </label>
          </header>


          <section className="h-auto w-full grow mt-16">
            <h6 >Fund via bank transfer</h6>
            <div className="card w-full bg-base-100 shadow-lg mt-3 rounded-lg">
              <div className="card-body p-4">
                <p className="flex items-center border-b py-3">
                  <span className="text-xs">Bank Name</span>
                  <span className="ml-auto font-semibold">Monnify Test Bank</span>
                </p>
                <p className="flex items-center border-b py-3">
                  <span className="text-xs">Account Name</span>
                  <span className="ml-auto font-semibold">{walletData?.accountName}</span>
                </p>
                <p className="flex items-center py-3">
                  <span className="text-xs">Account Number</span>
                  <span className="ml-auto flex items-center font-semibold"> <DocumentDuplicateIcon onClick={()=>copyToClipboard(walletData?.accountNumber)} className="w-5 mr-3 text-green-700" /> {walletData?.accountNumber}</span>
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>

  )
}

export default FundWallet;