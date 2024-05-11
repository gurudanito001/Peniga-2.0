"use client"

import { useEffect, useState } from "react";
import formatAsCurrency from "@/app/lib/formatAsCurrency";
import { BanknotesIcon, CreditCardIcon, CheckCircleIcon, XMarkIcon, ExclamationTriangleIcon} from "@heroicons/react/24/outline";
import { Offer, User } from ".prisma/client";
import { createTrade } from "@/app/lib/actions";
import { useRouter } from "next/navigation";



const InitiateTradeForm = ({offer, user}: {offer: any, user: any}) =>{
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({
    severity: "",
    message: ""
  });
  const [postingData, setPostingData] = useState(false);
  const [formData, setFormData] = useState({  
    userId: "",
    buyerId: "",
    sellerId: "",
    cardName: "",
    valueInUSD: "",
    rate: "",  
    cardType: "",
    offerId: ""
  })

  useEffect(()=>{
    let checkBox: HTMLInputElement | null = document.getElementById("initiateTrade-drawer") as HTMLInputElement;
    checkBox.checked = true
  },[offer])

  useEffect(()=>{
    if(user){
      setFormData(prevState => ({
        ...prevState,
        userId: user?.id,
        cardName: offer?.cardName,
        valueInUSD: offer?.valueInUSD || "",
        rate: offer?.rate || "",
        cardType: offer?.cardType || "",
        offerId: offer?.id
      }))
      if(offer?.offerCategory === "merchant"){
        setFormData( prevState =>({
          ...prevState,
          buyerId: offer?.user?.id,
          sellerId: user?.id
        }))
      }else if(offer?.offerCategory === "seller"){
        setFormData( prevState =>({
          ...prevState,
          buyerId: user?.id,
          sellerId: offer?.user?.id
        }))
      }
    }
    
  }, [offer, user])

  const handleChange = (prop: string) => (event: any) => {
    const onlyNumbersRegex = new RegExp("^[0-9]*$");
    const onlyNumberInputList = ["valueInUSD", "minRange", "maxRange", "rate"]
    if((onlyNumberInputList.includes(prop)) ){
      if(!onlyNumbersRegex.exec(event.target.value)){
        return;
      }else{
        if(event.target.value === ""){
          setFormData((prevState: any) => ({
            ...prevState,
            [prop]: event.target.value
          }))
          return;
        }else{
          setFormData((prevState: any) => ({
            ...prevState,
            [prop]: prop === "rate" ? parseFloat(event.target.value) : parseInt(event.target.value)
          }))
          return;
        }
      }
    }
    setFormData((prevState: any) => ({
      ...prevState,
      [prop]: event.target.value
    }))
  }

  const handleSubmit = ()=>{
    console.log(formData);
    setPostingData(true)
    const res = createTrade(formData).then( res =>{
      setPostingData(false)
      console.log(res)
      setMessage(res.message);
      router.push(`/dashboard/trades/${res.data?.id}`);
    }).catch(error =>{
      setPostingData(false)
      console.log(error)
      setMessage({
        severity: "error",
        message: error.message
      })
    })
  }
  return (
    <form className="d-flex flex-column gap-3 px-3 mt-5">
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


        {!offer?.cardType &&
          <div>
            <h6 className='font-semibold text-sm text-base-content'>Card Type</h6>
            <label className="input input-bordered rounded-lg flex items-center gap-2 bg-base" htmlFor="cardType">
              <CreditCardIcon className='w-5 text-base-content opacity-70' />
              <select className="select rounded-none bg-transparent w-full" value={formData?.cardType} onChange={handleChange("cardType")} id="cardType">
                <option disabled value="">Select Bank</option>
                <option value="physical">Physical</option>
                <option value="code">Code</option>
              </select>
            </label>
          </div>}

          {!offer?.valueInUSD &&
            <div>
              <h6 className='font-semibold text-sm text-base-content mt-5'>Giftcard value in $USD</h6>
              <label className="input input-bordered rounded-lg gap-2 flex items-center bg-base" htmlFor="valueInUSD">
                <BanknotesIcon className='w-5 text-base-content opacity-70' />
                <input type="number" className="grow border-none outline-none text-base-content text-sm w-full" value={formData?.valueInUSD} onChange={handleChange("valueInUSD")} id="valueInUSD" />
              </label>
            </div>}

          <p className="flex items-center border py-5 px-4 mt-4 rounded-lg">
            <span className="text-xs">You will {formData?.buyerId === formData?.userId ? "pay" : "receive"}:</span>
            <span className="ml-2 font-semibold">₦{formatAsCurrency((parseInt(formData?.rate) * parseInt(formData?.valueInUSD)))}</span>
          </p>

          <button type="button" disabled={postingData} onClick={handleSubmit} className={`btn text-white rounded-lg bg-primary shadow-lg hover:bg-purple-800 hover:shadow-none glass px-12 md:px-20 w-full mt-12`} >Initiate Trade {postingData && <span className="loading loading-spinner loading-xs ml-2"></span>} </button>
      </form>
  )
}


export default InitiateTradeForm;