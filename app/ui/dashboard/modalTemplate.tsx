"use client"

import { useState } from "react";
import { CheckCircleIcon, XMarkIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const ModalTemplate = ({modalId = "my_modal_3", id, btnText, btnClasses, heading, description, submitButtonText="Proceed", onSubmit = async()=>{}}: 
  {modalId: string, id: string | undefined, btnClasses: string, btnText: any, heading: string, description: any, submitButtonText?: string, onSubmit?: (id: string | undefined)=> any}
  ) => {
    const [message, setMessage] = useState({
      severity: "",
      message: ""
    });
    const [postingData, setPostingData] = useState(false);



    const handleSubmit = () =>{
      setPostingData(true)
      onSubmit(id).then((res: any) =>{
        console.log(res)
        setPostingData(false)
        document.getElementById("closeModalBtn")?.click()
      }).catch( (error: any) =>{
        setPostingData(false)
        console.log(error);
        setMessage({
          severity: "error",
          message: error.message
        })
      })
    }

  return (
    <>
      <button className={`${btnClasses}`} onClick={() => {
        const el = document?.getElementById(`${modalId}`) as HTMLDialogElement;
        el?.showModal()
        }}>{btnText}</button>
      <dialog id={`${modalId}`} className="modal z-50 flex w-screen items-center justify-center">
        <div className="modal-box bg-base text-base-content ">
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
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button id="closeModalBtn" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">{heading}</h3>
          {description}
          <div className="modal-action">
              <button disabled={postingData} onClick={handleSubmit} className="btn text-xs px-5 rounded-lg border-none bg-primary shadow-lg text-white hover:bg-primary hover:text-white hover:border-none hover:shadow-none ">{submitButtonText} {postingData && <span className="loading loading-spinner loading-xs ml-2"></span>} </button>
          </div>
        </div>
      </dialog>
    </>

  )
}

export default ModalTemplate