
"use client"
import { lusitana } from '@/app/ui/fonts';
import {
  XCircleIcon,
  ExclamationCircleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { useFormState, useFormStatus } from 'react-dom';
import { createOffer } from '@/app/lib/actions';
import { useRef, useState } from 'react';
import clsx from 'clsx';
import { OfferErrorState } from '@/app/lib/actions';

export default function CreateOfferForm({ userId }: { userId: string | undefined }) {
  const initialState = {
    message: {
      severity: "",
      message: "",
    }, errors: {
      cardName: [],
      valueInUSD: [],
      rate: [],
      minAmount: [],
      maxAmount: [],
      cardType: [],
      offerCategory: []
    }
  };
  const createOfferWithUserId = createOffer.bind(null, userId);
  const [state, dispatch] = useFormState(createOfferWithUserId, initialState);



  const [showAlert, setShowAlert] = useState(true);
  const [offerCategory, setOfferCategory] = useState("");
  console.log(state?.errors)

  const offerCategoryRef = useRef(null);


  return (
    <form action={dispatch} className="mt-10">

      <div role="alert" className={clsx(`alert absolute top-10 right-10 w-[350px]`,
        {
          'hidden': (state?.message?.message === "" || showAlert === false)
        }
      )}>
        {state?.message?.severity === "error" ?
          <ExclamationCircleIcon className='w-5 text-red-700' /> :
          <CheckCircleIcon className='w-5 text-success' />
        }
        <span className={clsx(
          'text-sm',
          {
            "text-red-700": state?.message?.severity === "error",
            "text-success": state?.message?.severity === "success"
          }
        )}>{state?.message?.message}</span>
        <button type="button" className="btn btn-xs btn-circle" onClick={() => setShowAlert(false)}> <XCircleIcon /> </button>
      </div>

      <label className="form-control w-full mb-2" htmlFor='offerCategory'>
        <div className="label">
          <span className="label-text">You want to:</span>
        </div>
        <select className="select select-bordered rounded-lg w-full" defaultValue="" onChange={(e) => setOfferCategory(e.target.value)} id='offerCategory' name='offerCategory'>
          <option value="" disabled>Buy / Sell</option>
          <option value="merchant">Buy Giftcard</option>
          <option value="seller">Sell Giftcard</option>
        </select>
        <p className=' text-red-800 text-xs'>{state?.errors?.offerCategory}</p>
      </label>

      <label className="form-control w-full mb-2" htmlFor='cardName'>
        <div className="label">
          <span className="label-text">Select Giftcard</span>
        </div>
        <select className="select select-bordered rounded-lg w-full" defaultValue="" id='cardName' name='cardName'>
          <option disabled value="">Choose GiftCard</option>
          <option value="sephora">Sephora</option>
          <option value="amazon">Amazon</option>
        </select>
        <p className=' text-red-800 text-xs'>{state?.errors?.cardName}</p>
      </label>

      {offerCategory === "seller" ?
        <label className="form-control w-full mb-2" htmlFor='valueInUSD'>
          <div className="label">
            <span className="label-text">Value in $USD</span>
          </div>
          <input type="number" placeholder="" className="input input-bordered rounded-lg w-full text-sm" id='valueInUSD' name='valueInUSD' />
          <p className=' text-red-800 text-xs'>{state?.errors?.valueInUSD}</p>
        </label> :

        <label className={"form-control w-full mb-2"} htmlFor='minAmount'>
          <div className="label">
            <span className="label-text">Giftcard Range</span>
          </div>
          <div className="w-full flex items-center">
            <input type="number" placeholder="Min Value in $" className="input input-bordered rounded-lg w-1/2 mr-1 text-sm" id='minAmount' name='minAmount' />
            <input type="number" placeholder="Max Value in $" className="input input-bordered rounded-lg w-1/2 ml-1 text-sm" id='maxAmount' name='maxAmount' />
          </div>
          <p className=' text-red-800 text-xs'>{state?.errors?.minAmount || state?.errors?.maxAmount}</p>
        </label>
      }



      <label className="form-control w-full mb-2" htmlFor='rate'>
        <div className="label">
          <span className="label-text">Rate in ₦</span>
        </div>
        <input type="number" placeholder="" className="input input-bordered rounded-lg w-full text-sm" id='rate' name='rate' />
        <p className=' text-red-800 text-xs'>{state?.errors?.rate}</p>
      </label>

      <label className="form-control w-full mb-2" htmlFor='cardType'>
        <div className="label">
          <span className="label-text"> Giftcard Type</span>
        </div>
        <select className="select select-bordered rounded-lg w-full" defaultValue="" id='cardType' name='cardType'>
          <option disabled value="">Choose GiftCard Type</option>
          <option value="physical">Physical</option>
          <option value="code">Code</option>
        </select>
        <p className=' text-red-800 text-xs'>{state?.errors?.cardType}</p>
      </label>
      <CreateOfferButton />
    </form>
  );
}

function CreateOfferButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="mt-10 w-full glass" aria-disabled={pending}>
      Create <ArrowRightIcon className="ml-auto h-5 w-5 text-sm text-gray-50" />
    </Button>
  );
}
