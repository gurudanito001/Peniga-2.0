"use client"

import { lusitana } from '@/app/ui/fonts';
import {
  XCircleIcon,
  KeyIcon,
  ExclamationCircleIcon,
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/lib/actions';
import Link from 'next/link';
import { useState } from 'react';
import clsx from 'clsx';

export default function LoginForm() {
  
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const [showAlert, setShowAlert] = useState(true);
  const [showPassword, setShowPassword] = useState(false)
  console.log(errorMessage)



  const togglePassword = ()=>{
    setShowPassword( prevState => !prevState)
  }
  return (
    <form action={dispatch} className="space-y-3 w-[400px]">

      {(errorMessage && showAlert)  && <div role="alert" className='alert absolute top-10 right-10 w-[350px]'>
        <ExclamationCircleIcon className='w-5 text-error' />
        <span className='text-sm text-error'
        >{errorMessage}</span>
        <button className="btn btn-xs btn-circle" onClick={() => setShowAlert(false)}> <XCircleIcon /> </button>
      </div>}


      <div className="flex-1 rounded-lg px-6 pb-4 pt-8 border glass">
        <header className=' mb-5'>
          <Link className=" text-base-content text-2xl font-extrabold" href="/">
            Peniga
          </Link>
        </header>
        <p className={`mb-3 text-white`}>
          Please log in to continue.
        </p>
        <div className="w-full">
          <h6 className='font-semibold text-sm text-base-content mt-5'>Email</h6>
          <label className="input input-bordered rounded-lg flex items-center gap-2 bg-base" htmlFor="email">
            <EnvelopeIcon className='w-5 text-base-content opacity-70' />
            <input type="email" className="grow border-none outline-none text-base-content text-sm" id="email" name="email" placeholder="Email" />
          </label>


          <h6 className='font-semibold text-sm text-base-content mt-5'>Password</h6>
          <label className="input input-bordered rounded-lg flex items-center gap-2 bg-base"  htmlFor="password">
            <KeyIcon className='w-5 text-base-content opacity-70' />
            <input type={showPassword ? "text": "password"} className="grow border-none text-base-content text-sm" id="password" name="password"  placeholder="Password" />
            {showPassword? 
            <EyeIcon type='button' className='w-6 text-base-content' onClick={togglePassword} /> : 
            <EyeSlashIcon type='button' className='w-6 text-base-content' onClick={togglePassword}  />
            }
          </label>
        </div>
        <LoginButton />

        <p className='mt-5 text-white'>Don&apos;t have an account? <Link href="/register" className=' text-purple-950 ml-3 font-bold' >Create Account</Link></p>
      </div>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="mt-10 w-full glass" aria-disabled={pending}>
      Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-sm text-gray-50" />
    </Button>
  );
}
