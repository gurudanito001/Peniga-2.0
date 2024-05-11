"use client"

import {
  XMarkIcon, HomeModernIcon, IdentificationIcon, BanknotesIcon, ExclamationTriangleIcon, CheckCircleIcon
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { validateBankAccount } from "@/app/lib/actions";
import { initiateTransfer } from "@/app/lib/actions";
import ReactCodeInput from "react-code-input";
import formatAsCurrency from "@/app/lib/formatAsCurrency";
import { authorizeTransaction } from "@/app/lib/actions";

const TransferFundsForm = ({ banks = [], email }: { banks: any[], email: string }) => {
  const [formData, setFormData] = useState({
    accountNumber: "",
    bankCode: "",
    accountName: "",
    amount: "",
    narration: ""
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
  const [authorizationData, setAuthorizationData] = useState({
    reference: "",
    authorizationCode: ""
  })
  const [errors, setErrors] = useState({
    amount: ""
  })
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [validatingAccount, setValidatingAccount] = useState(false);
  const [sendingTransfer, setSendingTransfer] = useState(false);
  const [authorizingTransfer, setAuthorizingTransfer] = useState(false);

  useEffect(() => {
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
  }, [formData?.accountNumber, formData?.bankCode])

  const handleChange = (prop: string) => (event: any) => {
    setFormData(prevState => ({
      ...prevState,
      [prop]: event.target.value
    }))
  }

  const handleSubmit = () => {
    console.log(formData);
    setSendingTransfer(true);
    initiateTransfer(formData).then(res => {
      console.log(res)
      setTransferResponse(res);
      setSendingTransfer(false);
      setAuthorizationData( prevState =>({
        ...prevState,
        reference: res.reference
      }))
    }).catch(error => {
      console.log(error.message)
      setErrorMessage(error.message)
      setSendingTransfer(false);
    })
  }

  const authorize = () => {
    setAuthorizingTransfer(true);
    authorizeTransaction(authorizationData).then( res =>{
      console.log(res)
      setSuccessResponse(res);
      setAuthorizingTransfer(false);
      setSuccessMessage("Transfer was successful");
    }).catch(error =>{
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
  return (
    <>
      {successMessage &&
        <div role="alert" className="alert bg-green-200 absolute top-14 right-5 w-[350px] rounded-lg px-2">
          <CheckCircleIcon className="w-4" />
          <span>{successMessage}</span>
          <button className="btn btn-xs btn-circle bg-transparent border-none" onClick={() => setSuccessMessage("")}> <XMarkIcon className="w-4" /> </button>
        </div>}
      {errorMessage &&
        <div role="alert" className="alert bg-red-200 absolute top-14 right-5 w-[350px] rounded-lg px-2">
          <ExclamationTriangleIcon className="w-4" />
          <span>{errorMessage}</span>
          <button className="btn btn-xs btn-circle bg-transparent border-none" onClick={() => setErrorMessage("")}> <XMarkIcon className="w-4" /> </button>
        </div>}
      {!transferResponse?.reference &&
        <form>
          <h6 className='font-semibold text-sm text-base-content'>Bank name</h6>
          <label className="input input-bordered rounded-lg flex items-center gap-2 bg-base" htmlFor="destinationBankCode">
            <HomeModernIcon className='w-5 text-base-content opacity-70' />
            <select className="select rounded-none bg-transparent w-full" value={formData?.bankCode} onChange={handleChange("bankCode")} id="destinationBankCode" name="destinationBankCode">
              <option disabled value="">Select Bank</option>
              {banks?.length > 0 && banks.map(item => {
                return (
                  <option key={item?.code} value={item?.code}>{item?.name}</option>
                )
              })}
            </select>
          </label>
          <h6 className='font-semibold text-sm text-base-content mt-5'>Account Number</h6>
          <label className="input input-bordered rounded-lg gap-2 flex items-center bg-base" htmlFor="destinationAccountNumber">
            <IdentificationIcon className='w-5 text-base-content opacity-70' />
            <input type="number" className="grow border-none outline-none text-base-content text-sm w-full" value={formData?.accountNumber} onChange={handleChange("accountNumber")} id="destinationAccountNumber" name="destinationAccountNumber" placeholder="Bank Account Number" />
            {validatingAccount && <span className="loading loading-spinner loading-xs"></span>}
          </label>
          <p className="text-green-700 text-xs font-semibold mt-1">{formData?.accountName}</p>

          <h6 className='font-semibold text-sm text-base-content mt-5'>Amount</h6>
          <label className="input input-bordered rounded-lg gap-2 flex items-center bg-base" htmlFor="amount">
            <BanknotesIcon className='w-5 text-base-content opacity-70' />
            <input type="number" className="grow border-none outline-none text-base-content text-sm w-full" value={formData?.amount} onChange={handleChange("amount")} id="amount" name="amount" placeholder="Amount" />
          </label>
          <p className="text-red-700 text-xs">{errors?.amount}</p>

          <h6 className='font-semibold text-sm text-base-content mt-5'>Narration</h6>
          <textarea placeholder="What's this for (Optional)" className="textarea textarea-bordered textarea-sm w-full bg-transparent rounded-lg" id="narration" name="narration" value={formData?.narration} onChange={handleChange("narration")} ></textarea>



          <button disabled={sendingTransfer} type="button" onClick={handleSubmit} className={`btn text-white rounded-lg bg-primary shadow-lg  hover:bg-purple-800 hover:shadow-none glass px-12 md:px-20 w-full mt-12`} >Transfer {sendingTransfer && <span className="loading loading-spinner loading-xs ml-2"></span>}</button>

        </form>}

      {transferResponse?.reference &&
        <section>
          {!successResponse?.reference &&
            <>
              <h6 className="font-semibold mb-1">Authorize Transaction</h6>
              <p className=" text-gray-500">A 6-digit pin was sent to <strong>{email}</strong></p>
            </>}
          <div className="card w-full bg-base-100 shadow-lg mt-3 rounded-lg">
            <div className="card-body p-4">
              <h5 className=" text-3xl text-center font-bold"> ₦ {formatAsCurrency(transferResponse?.amount + transferResponse?.totalFee)}</h5>
              {!successResponse?.reference && <p className="text-center text-green-700 font-semibold">Successful</p>}


              <p className="flex items-center border-b py-3 mt-5">
                <span className="text-xs">Bank Name</span>
                <span className="ml-auto font-semibold">{transferResponse?.destinationBankName}</span>
              </p>
              <p className="flex items-center border-b py-3">
                <span className="text-xs">Account Number</span>
                <span className="ml-auto flex items-center font-semibold">  {transferResponse?.destinationAccountNumber}</span>
              </p>
              <p className="flex items-center border-b py-3">
                <span className="text-xs">Account Name</span>
                <span className="ml-auto font-semibold">{transferResponse?.destinationAccountName || formData?.accountName}</span>
              </p>
              <p className="flex items-center border-b py-3">
                <span className="text-xs">Amount</span>
                <span className="ml-auto font-semibold">₦{formatAsCurrency(transferResponse?.amount)}</span>
              </p>
              <p className="flex items-center border-b py-3">
                <span className="text-xs">Transaction Fee</span>
                <span className="ml-auto font-semibold">₦{formatAsCurrency(transferResponse?.totalFee)}</span>
              </p>

              {successResponse?.reference && 
              <>
                <p className="flex items-center border-b py-3">
                  <span className="text-xs">Reference</span>
                  <span className="ml-auto font-semibold">{successResponse?.reference}</span>
                </p>
                <p className="flex items-center border-b py-3">
                  <span className="text-xs">Date</span>
                  <span className="ml-auto font-semibold">{successResponse?.dateCreated}</span>
                </p>

                <button  type="button" onClick={handleSubmit} className={`btn text-white rounded-lg bg-primary shadow-lg  hover:bg-purple-800 hover:shadow-none glass px-12 md:px-20 w-full mt-12`} >Share Receipt </button>
              </>}
              

              {successResponse?.reference === "" && 
              <>
                <p className="flex items-center border py-5 px-4 mt-4 rounded-lg">
                  <span className="text-xs">Balance:</span>
                  <span className="ml-2 font-semibold">₦{formatAsCurrency(transferResponse?.availableBalance)}</span>
                  <span className="ml-3 text-red-600">{transferResponse?.availableBalance < (transferResponse?.amount + transferResponse?.totalFee) && "(Insufficient Balance)"}</span>
                </p>

                <h6 className="text-center mt-5">Enter OTP to Authorize {authorizingTransfer && <span className="loading loading-spinner loading-xs ml-2"></span>}</h6>
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
          </div>
        </section>}

    </>

  )
}


export default TransferFundsForm;