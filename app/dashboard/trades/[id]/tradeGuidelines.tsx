"use client"

import { useEffect, useState } from "react";
import { CheckCircleIcon, XMarkIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import ReactCodeInput from "react-code-input";
import formatAsCurrency from "@/app/lib/formatAsCurrency";
import { initiateTransfer, authorizeTransaction, createEscrow, generateTempAccount } from "@/app/lib/actions";
import { getEscrowAccount } from "@/app/lib/data";

import type { User, Trade, TempAccount } from "@prisma/client";

const SellerModalContent = () => {
  return (
    <>
      <h3 className="font-bold text-lg mb-5">Waiting for Escrow</h3>
      <ul className=" list-disc flex flex-col gap-3 font-mono">
        <li>You will proceed once buyer has sent money to escrow</li>
        <li>Once you send the giftcard details in the chat, click on the dropdown and click on the [I have sent giftcard] button</li>
        <li>If there is any disagreement between you and Buyer on the authenticity of giftcard, click on the dropdown and raise a dispute </li>
        <li>Make a recording of important parts of the transaction in case there is a dispute</li>
      </ul>
    </>
  )
}


const EscrowModal = ({ modalId = "no_escrow_modal", userType = "buyer", user, escrowAccount, trade, tempAccount }: { modalId?: string, userType: "seller" | "buyer", user: User | undefined, escrowAccount: any, trade: Trade | null,  tempAccount: TempAccount | null }) => {
  const [message, setMessage] = useState({
    severity: "",
    message: ""
  });
  const [fetchingTempAccount, setFetchingTempAccount] = useState(false);

  const [formData, setFormData] = useState({
    accountNumber: "",
    bankCode: "",
    accountName: "",
    amount: "",
    narration: ""
  })
  const [authorizationData, setAuthorizationData] = useState({
    reference: "",
    authorizationCode: ""
  })
  const [transferResponse, setTransferResponse] = useState({
    amount: "",
    reference: "",
    status: "",
    dateCreated: "",
    totalFee: "",
    destinationAccountName: "",
    destinationBankName: "",
    destinationAccountNumber: "",
    destinationBankCode: "",
    availableBalance: ""
  })
  
  const [successResponse, setSuccessResponse] = useState({
    dateCreated: "",
    reference: ""
  })

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [sendingTransfer, setSendingTransfer] = useState(false);
  const [authorizingTransfer, setAuthorizingTransfer] = useState(false);

  useEffect(() => {
    const el = document?.getElementById(`${modalId}`) as HTMLDialogElement;
    el?.showModal();
  }, [])


  const handleSubmit = () => {
    // return console.log(formData)
    setSendingTransfer(true);
    initiateTransfer(formData).then((res: any) => {
      console.log(res)
      setTransferResponse(res);
      setSendingTransfer(false);
      setAuthorizationData( prevState =>({
        ...prevState,
        reference: res.reference
      }))
    }).catch((error: any) => {
      console.log(error.message)
      setErrorMessage(error.message)
      setSendingTransfer(false);
    })
  }

  const authorize = () => {
    setAuthorizingTransfer(true);
    authorizeTransaction(authorizationData).then( (res: any) =>{
      console.log(res)
      setSuccessResponse(res);
      createEscrow({userId: user?.id, tradeId: trade?.id, amount: trade?.rate ? (trade?.rate * trade?.valueInUSD) : 0}).then( (res)=>{
        console.log("escrow created", res)
      }).catch( error =>{
        console.log(error.message)
      })
      setAuthorizingTransfer(false);
      setSuccessMessage("Transfer was successful");
    }).catch((error: any) =>{
      console.log(error.message)
      setErrorMessage(error.message)
      setAuthorizingTransfer(false);
    })
  }

  useEffect(()=>{
    if(authorizationData?.authorizationCode?.length === 6){
      authorize()
    }
  }, [authorizationData?.authorizationCode])

  useEffect(()=>{
    setFormData( prevState =>({
      ...prevState,
      accountName: escrowAccount?.accountName,
      bankCode: escrowAccount?.topUpAccountDetails?.bankCode,
      accountNumber: escrowAccount?.accountNumber,
      amount: trade?.rate ? (trade?.rate * trade?.valueInUSD).toString() : "0",
      narration: `Send to Peniga escrow. tradeId-${trade?.id}`
    }))
  },[escrowAccount, trade])

  /* useEffect(() => {
    if (formData?.bankCode && formData.accountNumber.length === 10) {
      console.log(formData);
      setValidatingAccount(true);
      setErrorMessage("");
      setSuccessMessage("");
      validateBankAccount(formData).then(res => {
        console.log(res)
        setFormData(prevState => ({
          ...prevState,
          accountName: res.accountName
        }))
        setValidatingAccount(false);
      }).catch(error => {
        console.log(error.message)
        setErrorMessage(error.message)
        setValidatingAccount(false);
      })
    }
  }, [formData?.accountNumber, formData?.bankCode]) */

  return (
    <>
      {/* <button className={`btn text-white rounded-lg hidden`} onClick={() => {
        const el = document?.getElementById(`${modalId}`) as HTMLDialogElement;
        el?.showModal()
        }}>No Escrow Modal</button> */}
      <dialog id={`${modalId}`} className="modal z-50">

        <div className="modal-box bg-base text-base-content md:w-max p-5 md:p-12">
          {userType === "seller" &&
            <SellerModalContent />}

          {userType === "buyer" &&
            <>
              {message?.severity === "success" &&
                <div role="alert" className="alert bg-green-200 absolute top-14 right-5 w-[350px] rounded-lg px-2">
                  <CheckCircleIcon className="w-4" />
                  <span>{message?.message}</span>
                  <button className="btn btn-xs btn-circle bg-transparent border-none" onClick={() => setMessage({
                    severity: "",
                    message: ""
                  })}> <XMarkIcon className="w-4" /> </button>
                </div>}
              {message?.severity === "error" &&
                <div role="alert" className="alert bg-red-200 absolute top-14 right-5 w-[350px] rounded-lg px-2">
                  <ExclamationTriangleIcon className="w-4" />
                  <span>{message.message}</span>
                  <button className="btn btn-xs btn-circle bg-transparent border-none" onClick={() => setMessage({
                    severity: "",
                    message: ""
                  })}> <XMarkIcon className="w-4" /> </button>
                </div>}
              <h3 className="font-bold text-lg mb-5">Authorize Escrow</h3>
              <ul className=" list-disc flex flex-col gap-3 font-mono">
                <li>To Proceed, click on the [Authorize Escrow] button below</li>
                <li>You will authorize sending the equivalent of the transaction amount of this trade to escrow</li>
                <li>If the trade is not completed, your money in escrow will be refunded</li>
                <li>After seller sends giftcard in chat and you confirm that it is authentic, open the dropdown and click on [confirm Giftcard]</li>
                <li>If there is any disagreement between you and Buyer on the authenticity of giftcard, click on the dropdown and raise a dispute </li>
                <li>Make a recording of important parts of the transaction in case there is a dispute</li>
              </ul>

              <div className="mt-5">
                <p className="flex items-center border-b px-4 py-3">
                  <span className="text-xs">Transaction Amount</span>
                  <span className="ml-auto font-semibold">₦{formatAsCurrency(trade?.rate ? (trade?.rate * trade?.valueInUSD).toString() : "0")}</span>
                </p>
                {transferResponse?.reference &&
                  <>
                    <h6 className="text-center mt-5">Enter OTP to Authorize {authorizingTransfer && <span className="loading loading-spinner loading-xs ml-2"></span>}</h6>
                    <p className=" text-gray-500 mb-4">A 6-digit pin was sent to <strong>{user?.email}</strong></p>
                    <div className="flex">
                      <ReactCodeInput
                        className="mx-auto"
                        disabled={transferResponse?.availableBalance < (transferResponse?.amount + transferResponse?.totalFee)}
                        type="password"
                        name="Authorize Transaction"
                        inputMode="numeric"
                        autoFocus={true}
                        fields={6}
                        value={authorizationData.authorizationCode}
                        inputStyle={{
                          width: "45px",
                          height: "40px",
                          borderRadius: "4px",
                          border: "1px solid #0D3D8B",
                          fontSize: "24px",
                          fontWeight: "bold",
                          textAlign: "center",
                          verticalAlign: "center",
                          marginLeft: "0px",
                          marginRight: "7px",
                          marginBottom: "0px",
                          background: "#F9FAFC",
                          color: "#0D3D8B",
                          paddingTop: "7px",
                          paddingBottom: "7px"
                        }}
                        onChange={(code) => {
                          setAuthorizationData(prevState => ({
                            ...prevState,
                            authorizationCode: code
                          }))
                        }}
                      />
                    </div>
                  </>}
              </div>
            </>
          }
        </div>
      </dialog>
    </>

  )
}

export default EscrowModal