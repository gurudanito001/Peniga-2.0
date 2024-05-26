
import { lusitana } from "@/app/ui/fonts";
import { XMarkIcon, ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import type { Offer } from ".prisma/client";
import { auth } from "@/auth";
import { getUserByEmail } from "@/app/lib/data";
import formatAsCurrency from "@/app/lib/formatAsCurrency";
import InitiateTradeForm from "./initiateTradeForm";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { getOfferById } from "@/app/lib/data";
import Image from "next/image";



const InitiateTradeModal = async ({ offerId, }: { offerId: string }) => {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email);
  const offer = await getOfferById(offerId);


  /*  const pathName = usePathname();
   const router = useRouter();
 
   const handleClickOpenModal = () =>{
     router.push(`${pathName}?offerId=${id}`)
   }
 
   const handleClickCloseModal = () =>{
     router.push(`${pathName}`)
   }
  */

  return (
    <div className="drawer drawer-end w-16">
      <input id={`initiateTrade-drawer`} type="checkbox" className="drawer-toggle" />
      {/* <div>
        {category === "merchant" ?
          <label htmlFor={`initiateTrade-drawer`} onClick={handleClickOpenModal} className="btn btn-outline btn-md px-6 rounded-lg border-none bg-accent text-white hover:bg-accent hover:text-white hover:border-none hover:shadow-none z-10">
            Sell
          </label> :
          <label htmlFor={`initiateTrade-drawer`} onClick={handleClickOpenModal} className="btn btn-outline btn-md px-6 rounded-lg border-none bg-primary text-white hover:bg-primary hover:text-white hover:border-none hover:shadow-none z-10">
            Buy
          </label>
        }
      </div> */}
      <div className="drawer-side z-50">

        <label /* htmlFor={`initiateTrade-drawer`} */ aria-label="close sidebar" className="drawer-overlay">
          <Link className=" block h-full w-full" href={`/dashboard/market/${offer?.offerCategory}`}> </Link>
        </label>

        <div className="menu p-4 w-[350px] lg:w-[400px] min-h-full flex flex-col text-base-content rounded-s-lg bg-base transition ease-in-out">
          <header className="flex items-center">
            <h4 className={`${lusitana.className} text-2xl font-bold`}>Initiate Trade</h4>
            <Link href={`/dashboard/market/${offer?.offerCategory}`} className="btn btn-circle btn-sm ml-auto">
              <XMarkIcon className="w-4" />
              {/* <label htmlFor={`initiateTrade-drawer`} className="btn btn-circle btn-sm ml-auto">
              </label> */}
            </Link>

          </header>

          <section className="h-auto w-full grow mt-16">


            <div className="card w-full bg-base-100 shadow-md mt-3 rounded-lg">
              <div className="card-body p-4">
                <div className="flex items-center border-b py-3">
                  <span className="text-xs">Buyer</span>
                  {offer?.offerCategory === "merchant" &&
                    <div className="flex items-center gap-3 ml-auto">
                      <div className="avatar">
                        <Image src="/avatar1.png" className='rounded-full' width={40} height={40} style={{ width: "40px", height: "40px", objectFit: "contain" }} alt='avatar' />
                      </div>
                      <div>
                        <div className="font-bold capitalize">{offer?.user?.firstName} {offer?.user?.lastName}</div>
                        <div className="text-xs opacity-50">{offer?.user?.username || offer?.user?.email}</div>
                      </div>
                    </div>
                  }
                  {offer?.offerCategory === "seller" &&
                    <div className="flex items-center gap-3 ml-auto">
                      <div className="avatar">
                        <Image src="/avatar1.png" className='rounded-full' width={40} height={40} style={{ width: "40px", height: "40px", objectFit: "contain" }} alt='avatar' />
                      </div>
                      <div>
                        <div className="font-bold capitalize">{user?.firstName} {user?.lastName}</div>
                        <div className="text-xs opacity-50">{user?.username || user?.email}</div>
                      </div>
                    </div>
                  }
                </div>

                <div className="flex items-center border-b py-3">
                  <span className="text-xs">Seller</span>
                  {offer?.offerCategory === "seller" &&
                    <div className="flex items-center gap-3 ml-auto">
                      <div className="avatar">
                        <Image src="/avatar1.png" className='rounded-full' width={40} height={40} style={{ width: "40px", height: "40px", objectFit: "contain" }} alt='avatar' />
                      </div>
                      <div>
                        <div className="font-bold capitalize">{offer?.user?.firstName} {offer?.user?.lastName}</div>
                        <div className="text-xs opacity-50">{offer?.user?.username || offer?.user?.email}</div>
                      </div>
                    </div>
                  }
                  {offer?.offerCategory === "merchant" &&
                    <div className="flex items-center gap-3 ml-auto">
                      <div className="avatar">
                        <Image src="/avatar1.png" className='rounded-full' width={40} height={40} style={{ width: "40px", height: "40px", objectFit: "contain" }} alt='avatar' />
                      </div>
                      <div>
                        <div className="font-bold capitalize">{user?.firstName} {user?.lastName}</div>
                        <div className="text-xs opacity-50">{user?.username || user?.email}</div>
                      </div>
                    </div>
                  }
                </div>

                <p className="flex items-center border-b py-3">
                  <span className="text-xs">Card</span>
                  <span className="ml-auto font-semibold capitalize">{offer?.cardName}</span>
                </p>

                <p className="flex items-center border-b py-3">
                  <span className="text-xs">Value in $USD</span>
                  {offer?.offerCategory === "merchant" ?
                    <span className='ml-auto flex items-center font-semibold'>${formatAsCurrency(offer?.minAmount)} <ArrowLongRightIcon className='w-5' /> ${formatAsCurrency(offer?.maxAmount)}</span> :
                    <span className="ml-auto flex items-center font-semibold"> {formatAsCurrency(offer?.valueInUSD)}</span>
                  }
                </p>

                <p className="flex items-center py-3">
                  <span className="text-xs">Card Type</span>
                  <span className="ml-auto flex items-center font-semibold capitalize"> {offer?.cardType}</span>
                </p>

                <p className="flex items-center py-3">
                  <span className="text-xs">Rate</span>
                  <span className="ml-auto flex items-center font-semibold capitalize">₦{formatAsCurrency(offer?.rate)}</span>
                </p>
              </div>
            </div>
            {
              offer?.id && <InitiateTradeForm offer={offer} user={user} />
            }


          </section>
        </div>
      </div>
    </div>
  )
}


export default InitiateTradeModal