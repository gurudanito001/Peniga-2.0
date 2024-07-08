"use client"

import { useState } from "react";
import formatAsCurrency from "@/app/lib/formatAsCurrency";
import {  generateTempAccount, mockTransfer } from "@/app/lib/actions";
import type { User, Trade, TempAccount } from "@prisma/client";




const EscrowPayment = ({ userType = "buyer", user, trade, tempAccount, escrowPaymentDetails }: { userType: "seller" | "buyer", user: User | undefined, trade: any, tempAccount: TempAccount | null, escrowPaymentDetails: any}) => {

  console.log("tempAccount", tempAccount)
  
  const [fetchingTempAccount, setFetchingTempAccount] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");


  const getTempAccount = () =>{
    if(!user || !trade){
      return;
    }
    setFetchingTempAccount(true)
    generateTempAccount({email: user?.email, tradeId: trade?.id, amount: (trade?.rate && trade?.valueInUSD) ? (trade?.rate * trade?.valueInUSD) : 0 })
      .then(res =>{
        setFetchingTempAccount(false)
        console.log(res)
      }).catch( error=>{
        setFetchingTempAccount(false)
        console.log(error)
      })
  }

  const deriveTempAccountDetails = ()=>{
    let tempAccDetails: any = tempAccount?.accountDetails;
    return tempAccDetails
  }

  


  const iHaveSentMoney = () => {
    
  }

  return (
    <>
      <div>

          {userType === "seller" &&
            <div>
              <h3 className="font-bold text-lg mb-2">Waiting for Escrow Confirmation</h3>
              <p className=" text-gray-600 font-semibold">We are yet to confirm buyer escrow payment. While you wait, here are a few trade guidelines</p>
              <ul className="list-disc flex flex-col gap-3 font-mono mt-5">
                <li>You will proceed once buyer has sent money to escrow</li>
                <li>Click on the chat button to start a chat with the buyer</li>
                <li>Once you send the giftcard in the chat, click on the [I have sent giftcard] button in the dropdown at the top right of the chat</li>
                <li>If there is any disagreement between you and Buyer on the authenticity of giftcard, click on the dropdown and raise a dispute </li>
                <li>Make a recording of important parts of the transaction in case there is a dispute</li>
              </ul>
            </div>
          }

          {userType === "buyer" &&
            <div>
              {/* {successMessage &&
                <div role="alert" className="alert bg-green-200 absolute top-14 right-5 w-[350px] rounded-lg px-2">
                  <CheckCircleIcon className="w-4" />
                  <span>{successMessage}</span>
                  <button className="btn btn-xs btn-circle bg-transparent border-none" onClick={() => setSuccessMessage("")}> <XMarkIcon className="w-4" /> </button>
                </div>
              }
              {errorMessage &&
                <div role="alert" className="alert bg-red-200 absolute top-14 right-5 w-[350px] rounded-lg px-2">
                  <ExclamationTriangleIcon className="w-4" />
                  <span>{errorMessage}</span>
                  <button className="btn btn-xs btn-circle bg-transparent border-none" onClick={() => setErrorMessage("")}> <XMarkIcon className="w-4" /> </button>
                </div>
              } */}

              <header>

              </header>

              { !tempAccount &&
                <section>
                  <h3 className="font-bold text-lg mb-5">Generate Escrow Account </h3>
                  <ul className="list-disc flex flex-col gap-3 font-mono">
                    <li>To Proceed, you will need to generate an escrow account to transfer to</li>
                    <li>Click on the button below to generate an escrow account</li>
                  </ul>

                  <button type="button" disabled={fetchingTempAccount} onClick={getTempAccount} className={`btn btn-lg text-sm text-white rounded-lg bg-primary shadow-lg hover:bg-purple-800 hover:shadow-none glass w-full mt-12`} >Generate Escrow Account {fetchingTempAccount && <span className="loading loading-spinner loading-xs ml-2"></span>} </button>
                </section>
              }

              { tempAccount &&
                <section>
                  <h3 className="font-bold text-lg mb-5">Transfer Giftcard Value to Escrow </h3>
                  <ul className="list-disc flex flex-col gap-3 font-mono">
                    <li>To Proceed, you will need to make a bank transfer to the Peniga Escrow Account below</li>
                    <li className=" text-accent font-bold">The account below can only be used for this trade</li>
                  </ul>

                  {(escrowPaymentDetails.totalEscrowPayment > 0 && escrowPaymentDetails?.totalEscrowPayment <  escrowPaymentDetails?.expectedAmount) &&
                  <div className="card bg-base-100 shadow-lg mt-5">
                    <div className="card-body p-5">
                      <p>We have received <strong className="text-lg">₦{formatAsCurrency(escrowPaymentDetails.totalEscrowPayment)}</strong></p>
                      <p>We are expecting the balance of <strong className="text-lg">₦{formatAsCurrency(escrowPaymentDetails.balance)}</strong></p>
                      <p className="font-bold text-accent">Transfer the balance to the account below</p>

                    </div>
                  </div>}
                  <div className="card bg-base-100 shadow-lg mt-5">
                    <div className="card-body">
                      <p className="flex items-center border-b px-4 pb-3">
                        <span className="text-xs">Account Number</span>
                        <span className="ml-auto font-semibold">{deriveTempAccountDetails()?.account_number}</span>
                      </p>
                      <p className="flex items-center border-b px-4 py-3">
                        <span className="text-xs">Bank Name</span>
                        <span className="ml-auto font-semibold">{deriveTempAccountDetails()?.bank_name}</span>
                      </p>
                      <p className="flex items-center px-4 py-3">
                        <span className="text-xs">Account Name</span>
                        <span className="ml-auto font-semibold">Peniga Escrow Account</span>
                      </p>
                      <p className="flex items-center px-4 py-3">
                        <span className="text-xs">Amount</span>
                        <span className="ml-auto text-primary font-bold text-2xl">₦{formatAsCurrency(parseFloat(deriveTempAccountDetails()?.amount))}</span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <p className=" text-primary text-center text-xs font-semibold mt-12 mb-2">Click the button below only after you have sent money </p>
                    <button type="button" className={`btn text-white rounded-lg bg-primary shadow-lg hover:bg-purple-800 hover:shadow-none glass px-12 md:px-20 w-full`} > I Have Sent Money  </button>
                  </div>
                </section>
              }
              
            </div>
          }
      </div>
    </>

  )
}

export default EscrowPayment