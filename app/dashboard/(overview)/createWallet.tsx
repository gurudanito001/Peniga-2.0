"use client"

import clsx from 'clsx';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  IdentificationIcon,
  CalendarIcon,
  ArrowRightIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { useFormState, useFormStatus } from 'react-dom';
import { createWallet } from '@/app/lib/actions';
import { useState } from 'react';
import { lusitana } from '@/app/ui/fonts';
import { useRef } from 'react';

const CreateWallet = ({btnRef}: {btnRef?: any}) => {
  //const btnRef: any = useRef("createWallet")
  const initialState = {
    message: {
      severity: "",
      message: "",
    }, errors: {
      bvn: [],
      bvnDateOfBirth: [],
    }
  };
  const [state, dispatch] = useFormState(createWallet, initialState);
  const [showAlert, setShowAlert] = useState(true);
  console.log(state)

  return (
    <>
      <button ref={btnRef} className={`btn text-white rounded-lg hidden`} onClick={() => {
        const el = document?.getElementById(`create-wallet-modal`) as HTMLDialogElement;
        el?.showModal()
        }}>Create Wallet</button>
      <dialog id={`create-wallet-modal`} className="modal z-50">
        <div className="modal-box bg-base text-base-content">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h1 className={`${lusitana.className} hidden lg:block mb-0 text-base-content text-2xl font-bold`}>
            Create Wallet
          </h1>
          <p className="py-4">Fill the form below to create a wallet</p>
          <div className="modal-action">

            <form action={dispatch} className="w-full">

              <div role="alert" className={clsx(`alert absolute top-10 right-10 w-[350px]`,
                {
                  'hidden': (state?.message?.message === "" || showAlert === false),
                  'bg-green-200': state?.message?.severity === "success",
                  'bg-red-200': state?.message?.severity === "error",
                }
              )}>
                {state?.message?.severity === "error" ?
                  <ExclamationCircleIcon className='w-5' /> :
                  <CheckCircleIcon className='w-5' />
                }
                <span className='text-sm'>{state?.message?.message}</span>
                <button className="btn btn-xs btn-circle bg-transparent border-none" onClick={() => setShowAlert(false)}> <XMarkIcon className='w-5' /> </button>
              </div>

              <div className="flex-1 rounded-lg px-6 py-4">
                <div className="w-full">
                  <h6 className='font-semibold text-sm'>BVN</h6>
                  <label className="input input-bordered rounded-lg gap-2 flex items-center bg-base" htmlFor="bvn">
                    <IdentificationIcon className='w-5 text-base-content opacity-70' />
                    <input type="number" className="grow border-none outline-none text-base-content text-sm w-full" id="bvn" name="bvn" placeholder="Bank Verification Number" />
                  </label>
                  
                  <div id="customer-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.bvn &&
                      state.errors.bvn.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                          {error}
                        </p>
                      ))}
                  </div>

                  <h6 className='font-semibold text-sm mt-8'>Date of Birth</h6>
                  <label className="input input-bordered rounded-lg flex items-center gap-2 bg-base" htmlFor="bvnDateOfBirth">
                    <CalendarIcon className='w-5 text-base-content opacity-70' />
                    <input type="date" className="grow border-none outline-none text-base-content text-sm" id="bvnDateOfBirth" name="bvnDateOfBirth" placeholder="Date of Birth" />
                  </label>
                  <div id="customer-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.bvnDateOfBirth &&
                      state.errors.bvnDateOfBirth.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                          {error}
                        </p>
                      ))}
                  </div>

                </div>
                <SubmitButton />
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default CreateWallet;


function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="mt-10 w-full glass" aria-disabled={pending}>
      Create Wallet <ArrowRightIcon className="ml-auto h-5 w-5 text-sm text-gray-50" /> 
    </Button>
  );
}