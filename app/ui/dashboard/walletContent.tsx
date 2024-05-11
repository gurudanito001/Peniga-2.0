"use client"

import { PaperAirplaneIcon, PlusIcon, EyeIcon, EyeSlashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { toggleShowBalance } from '@/app/lib/actions';
import formatAsCurrency from '@/app/lib/formatAsCurrency';
import { useFormState } from 'react-dom';
import CreateWallet from '@/app/dashboard/(overview)/createWallet';
import FundWallet from '@/app/dashboard/(overview)/fundWallet';
import TransferFunds from '@/app/dashboard/(overview)/transferFunds';
import { useRef } from 'react';


const WalletContent = ({ user, walletBalance, banks }: { user: any, walletBalance: any, banks: any[] /*  createWalletRef: any, fundWalletRef: any, transferFundsRef: any */ }) => {
  const showBalance: true | false = user?.wallet?.showBalance || false
  let toggleShowBalanceById = toggleShowBalance.bind(null, user?.id);
  const [state, dispatch] = useFormState(toggleShowBalanceById, showBalance);

  const createWalletRef: any = useRef("createWallet");
  const fundWalletRef: any = useRef("fundWallet");
  const transferFundsRef: any = useRef("transferFunds");


  const handleClickFundWallet = () => {
    if (user && !user?.wallet) {
      createWalletRef.current.click()
    } else {
      fundWalletRef.current.click();
    }
  }

  const handleClickTransferFunds = () => {
    if (user && !user?.wallet) {
      createWalletRef.current.click()
    } else {
      transferFundsRef.current.click();
    }
  }



  return (
    <div className='w-full'>
      <div className="card max-w-sm bg-primary glass text-base-300 shadow-lg">
        <div className="card-body flex flex-row items-start">
          <div className=''>
            <dl>
              <dt className='text-xs font-bold flex items-center'>
                <span>Ledger Balance</span>
                <form action={dispatch}>
                  <button>
                    {state ?
                      <EyeIcon className='w-5 ml-16 cursor-pointer' /> :
                      <EyeSlashIcon className='w-5 ml-16 cursor-pointer' />
                    }
                  </button>
                </form>
              </dt>

              <dd className={`${lusitana?.className} d-flex align-middle font-bold md:text-lg`}>₦{state ? formatAsCurrency(walletBalance?.ledgerBalance) : "---"} </dd>
              <dt className='text-xs font-bold mt-3'>Available Balance</dt>
              <dd className={`${lusitana?.className} text-xl md:text-2xl font-extrabold`}>₦{state ? formatAsCurrency(walletBalance?.availableBalance) : "---"}</dd>
            </dl>
          </div>

          <div className="flex flex-col ml-auto gap my-auto">
            <button className={`block btn btn-sm glass hover:glass text-xs text-base-100`} onClick={handleClickTransferFunds}>
              Send <PaperAirplaneIcon className="w-3 ml-1 inline" />
            </button>
            <button className={`block btn btn-sm glass hover:glass text-xs text-base-100 mt-5`} onClick={handleClickFundWallet}>
              Add Funds  <PlusIcon className="w-3 ml-1 inline" />
            </button>
          </div>
        </div>
      </div>


      <CreateWallet btnRef={createWalletRef} />
      <FundWallet btnRef={fundWalletRef} walletData={{ accountName: user?.wallet?.walletData?.accountName, accountNumber: user?.wallet?.walletData?.accountNumber }} />
      <TransferFunds banks={banks} btnRef={transferFundsRef} walletData={{ accountName: user?.wallet?.walletData?.accountName, accountNumber: user?.wallet?.walletData?.accountNumber}} email={user?.email} />
    </div>

  )

}

export default WalletContent