"use client"

import { useEffect } from "react";
import EscrowPayment from "./escrowPayment";
import type { User, Trade, TempAccount } from "@prisma/client";


const EscrowModal = ({ modalId = "no_escrow_modal", userType = "buyer", user, escrowPaymentDetails, trade, tempAccount }: { modalId?: string, userType: "seller" | "buyer", user: User | undefined, escrowPaymentDetails: any, trade: Trade | null,  tempAccount: TempAccount | null }) => {


  
  useEffect(() => {
    const el = document?.getElementById(`${modalId}`) as HTMLDialogElement;
    el?.showModal();
  }, [])

  return (
      <dialog id={`${modalId}`} className="modal z-50">
        <div className="modal-box bg-base text-base-content md:w-max p-5 md:p-12">
          <EscrowPayment userType={userType} user={user} trade={trade} tempAccount={tempAccount} escrowPaymentDetails={escrowPaymentDetails} />
        </div>
      </dialog>
  )
}

export default EscrowModal