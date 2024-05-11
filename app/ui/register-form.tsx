"use client"

import clsx from 'clsx';
import {
  UserCircleIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  UserIcon,
  KeyIcon,
  EnvelopeIcon,
  ArrowRightIcon,
  XCircleIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline';
import { Button } from './button';
import { useFormState, useFormStatus } from 'react-dom';
import { register } from '@/app/lib/actions';
import Link from 'next/link';
import { useState } from 'react';


export default function RegisterForm() {
  const initialState = {
    message: {
      severity: "",
      message: "",
    }, errors: {
      firstName: [],
      lastName: [],
      email: [],
      username: [],
      password: []
    }
  };
  const [state, dispatch] = useFormState(register, initialState);
  const [showAlert, setShowAlert] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  console.log(state)

  const togglePassword = ()=>{
    setShowPassword( prevState => !prevState)
  }
  return (
    <form action={dispatch} className="space-y-3 w-[400px]">

      <div role="alert" className={clsx(`alert absolute top-10 right-10 w-[350px]`,
        {
          'hidden': (state?.message?.message === "" || showAlert === false)
        }
      )}>
        {state?.message?.severity === "error" ?
        <ExclamationCircleIcon className='w-5 text-error' /> :
        <CheckCircleIcon className='w-5 text-success' /> 
        }
        <span className={clsx(
          'text-sm',
          {
            "text-error": state?.message?.severity === "error",
            "text-success": state?.message?.severity === "success"
          }
        )}>{state?.message?.message}</span>
        <button className="btn btn-xs btn-circle" onClick={()=> setShowAlert(false)}> <XCircleIcon /> </button>
      </div>

      <div className="flex-1 rounded-lg px-6 pb-4 pt-8 border glass">
        <header className=' mb-5'>
          <Link className=" text-base-content text-2xl font-extrabold" href="/">
            Peniga
          </Link>
        </header>
        <p className={`mb-3 text-white font-bold`}>
          Fill form to register
        </p>
        <div className="w-full">
          <h6 className='font-semibold text-sm text-base-content'>First name</h6>
          <label className="input input-bordered rounded-lg flex items-center gap-2 bg-base" htmlFor="firstName">
            <UserCircleIcon className='w-5 text-base-content opacity-70' />
            <input type="text" className="grow border-none outline-none text-base-content text-sm" id="firstName" name="firstName" placeholder="First name" />
          </label>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.firstName &&
              state.errors.firstName.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
          <h6 className='font-semibold text-sm text-base-content mt-5'>Last name</h6>
          <label className="input input-bordered rounded-lg flex items-center gap-2 bg-base" htmlFor="lastName">
            <UserCircleIcon className='w-5 text-base-content opacity-70' />
            <input type="text" className="grow border-none outline-none text-base-content text-sm" id="lastName" name="lastName" placeholder="Last name" />
          </label>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.lastName &&
              state.errors.lastName.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
          <h6 className='font-semibold text-sm text-base-content mt-5'>Username</h6>
          <label className="input input-bordered rounded-lg flex items-center gap-2 bg-base" htmlFor="username">
            <UserIcon className='w-5 text-base-content opacity-70' />
            <input type="text" className="grow border-none outline-none text-base-content text-sm" id="username" name="username" placeholder="Username" />
          </label>
          <h6 className='font-semibold text-sm text-base-content mt-5'>Email</h6>
          <label className="input input-bordered rounded-lg flex items-center gap-2 bg-base" htmlFor="email">
            <EnvelopeIcon className='w-5 text-base-content opacity-70' />
            <input type="email" className="grow border-none outline-none text-base-content text-sm" id="email" name="email" placeholder="Email" />
          </label>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.email &&
              state.errors.email.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
          
          <h6 className='font-semibold text-sm text-base-content mt-5'>Password</h6>
          <label className="input input-bordered rounded-lg flex items-center gap-2 bg-base"  htmlFor="password">
            <KeyIcon className='w-5 text-base-content opacity-70' />
            <input type={showPassword ? "text": "password"} className="grow border-none text-base-content text-sm" id="password" name="password"  placeholder="Password" />
            {showPassword? 
            <EyeIcon type='button' className='w-6 text-base-content' onClick={togglePassword} /> : 
            <EyeSlashIcon type='button' className='w-6 text-base-content' onClick={togglePassword}  />
            }
          </label>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.password &&
              state.errors.password.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>

        </div>
        <RegisterButton />

        <p className='mt-5 text-white'>Don&apos;t have an account? <Link href="/login" className=' text-purple-950 ml-3 font-bold' >Login</Link></p>
      </div>
    </form>
  );
}

function RegisterButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="mt-10 w-full glass" aria-disabled={pending}>
      Create Account <ArrowRightIcon className="ml-auto h-5 w-5 text-sm text-gray-50" /> 
    </Button>
  );
}
