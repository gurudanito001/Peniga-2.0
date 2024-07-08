

import { getAllBanks } from "@/app/lib/data";
import { lusitana } from "@/app/ui/fonts";
// import RedeemPaymentForm from "./redeemPaymentForm";
import {
  XMarkIcon, HomeModernIcon, IdentificationIcon, BanknotesIcon, ExclamationTriangleIcon, CheckCircleIcon
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import ReactCodeInput from "react-code-input";
import formatAsCurrency from "@/app/lib/formatAsCurrency";
import { verifyBankAccount } from "@/app/lib/data";
import RedeemPaymentForm from "./redeemPaymentForm";

const RedeemPayment = async () => {
  //const [banks, setBanks] = useState<{ id: number, code: string, name: string }[]>([])
  const banks = await getAllBanks() as any;
  console.log("from redeemPayments component", banks)
  /* useEffect(() => {
    getAllBanks()
      .then(res => {
        setBanks(res.data)
      }).catch(error => {
        console.log(error)
      })
  }, []) */

  /* const [formData, setFormData] = useState({
    accountNumber: "",
    bankCode: "",
    accountName: "",
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
  }) */
  /* const [successResponse, setSuccessResponse] = useState({
    dateCreated: "",
    reference: ""
  })

  const [errors, setErrors] = useState({
    amount: ""
  })
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [validatingAccount, setValidatingAccount] = useState(false);
  const [sendingTransfer, setSendingTransfer] = useState(false); */

  /* useEffect(() => {
    if (formData.accountNumber.length === 10 && formData?.bankCode) {
      console.log(formData);
      setValidatingAccount(true);
      setErrorMessage("");
      setSuccessMessage("");
      verifyBankAccount({ account_number: formData?.accountNumber, account_bank: formData?.bankCode }).then((res: any) => {
        console.log(res)
        setFormData(prevState => ({
          ...prevState,
          accountName: res.accountName
        }))
        setValidatingAccount(false);
      }).catch((error: any) => {
        console.log(error.message)
        setErrorMessage(error.message)
        setValidatingAccount(false);
      })
    }
  }, [formData?.accountNumber, formData?.bankCode]) */

  /* const handleChange = (prop: string) => (event: any) => {
    setFormData(prevState => ({
      ...prevState,
      [prop]: event.target.value
    }))
  }

  const handleSubmit = () => {
    return console.log(formData);
  } */
  return (
    <>
      <div className="drawer drawer-end z-10">
        <input id="payment-drawer" type="checkbox" className="drawer-toggle" />
        <div>
          <label htmlFor="payment-drawer" className="btn w-60 btn-outline bg-primary glass drawer-button text-white flex align-middle mt-10">
            Redeem Payment
          </label>
        </div>

        <div className="drawer-side z-30">
          <label htmlFor="payment-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <div className="menu p-4 w-[350px] lg:w-[400px] min-h-full flex flex-col text-base-content rounded-xl bg-base">
            <header className="flex items-center">
              <h4 className={`${lusitana.className} text-2xl font-bold`}>Redeem Payment</h4>
              <label htmlFor="payment-drawer" className="btn btn-circle btn-sm ml-auto">
                <XMarkIcon className="w-4" />
              </label>
            </header>
            <section className="mt-4 h-auto w-full grow">
              <ul className="grow overflow-y-auto px-2">
                <RedeemPaymentForm banks={banks?.data} />
              </ul>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}

export default RedeemPayment