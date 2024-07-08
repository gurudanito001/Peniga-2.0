"use client"

import {
  XMarkIcon, HomeModernIcon, IdentificationIcon, ExclamationTriangleIcon, CheckCircleIcon
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { verifyBankAccount } from "@/app/lib/data";

const RedeemPaymentForm = ({ banks = [] }: { banks?: { id: number, code: string, name: string }[] }) => {
  const [formData, setFormData] = useState({
    account_number: "",
    bankCode: "",
    account_name: "",
    amount: "",
    authCode: "",
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

  const [errors, setErrors] = useState({
    amount: ""
  })
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [validatingAccount, setValidatingAccount] = useState(false);
  const [sendingTransfer, setSendingTransfer] = useState(false);

  useEffect( () => {
    if (formData.account_number.length === 10 && formData?.bankCode) {
      console.log(formData);
      setValidatingAccount(true);
      setErrorMessage("");
      setSuccessMessage("");
      verifyBankAccount({ account_number: formData?.account_number, account_bank: formData?.bankCode }).then((res: any) => {
        console.log(res)
        setFormData(prevState => ({
          ...prevState,
          ...res.data
        }))
        setValidatingAccount(false);
      }).catch((error: any) => {
        console.log(error.message)
        setErrorMessage(error.message)
        setValidatingAccount(false);
      })
    }
  }, [formData?.account_number, formData?.bankCode])

  const handleChange = (prop: string) => (event: any) => {
    setFormData(prevState => ({
      ...prevState,
      [prop]: event.target.value
    }))
  }

  const handleSubmit = () => {
    return console.log(formData);
  }
  return (
    <div>
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



      <form className="mt-8">
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
          <input type="number" className="grow border-none outline-none text-base-content text-sm w-full" value={formData?.account_number} onChange={handleChange("account_number")} id="destinationAccountNumber" name="destinationAccountNumber" placeholder="Bank Account Number" />
          {validatingAccount && <span className="loading loading-spinner loading-xs"></span>}
        </label>
        <p className="text-green-700 text-xs font-semibold mt-1">{formData?.account_name}</p>

        <h6 className="font-semibold text-sm text-base-content mt-5">Enter OTP to Authorize</h6>
        <label className="input input-bordered rounded-lg gap-2 flex items-center bg-base">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd" />
          </svg>
          <input type="password" className="grow border-none outline-none text-base-content text-sm w-full" onChange={handleChange("authCode")} value={formData?.authCode} />
        </label>

        {/* <div className="flex">
          <ReactCodeInput
            className="mx-auto"
            type="password"
            name="Authorize Transaction"
            inputMode="numeric"
            fields={4}
            value={formData?.authCode}
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
              setFormData(prevState => ({
                ...prevState,
                authCode: code
              }))
            }}
          />
        </div> */}

        <button disabled={sendingTransfer} type="button" onClick={handleSubmit} className={`btn text-white rounded-lg bg-primary shadow-lg  hover:bg-purple-800 hover:shadow-none glass px-12 md:px-20 w-full mt-12`} >Redeem Payment {sendingTransfer && <span className="loading loading-spinner loading-xs ml-2"></span>}</button>
      </form>

    </div>

  )
}


export default RedeemPaymentForm;