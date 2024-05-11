import { lusitana } from "@/app/ui/fonts";
import { XMarkIcon } from "@heroicons/react/24/outline";
import EditOfferForm from "./editOfferForm";
import { getOfferById } from "@/app/lib/data";
import type { Offer } from "@prisma/client";

const EditOfferModal = ({offer}: {offer: Offer | null}) => {

  return (
    <div className="drawer drawer-end w-24 ml-auto">
      <input id="edit-offer-drawer" type="checkbox" className="drawer-toggle" />
      <div className=''>
        {/* Page content here */}
        <label htmlFor="edit-offer-drawer" className="btn btn-sm btn-outline rounded-lg border-primary text-primary hover:bg-primary hover:text-white shadow-lg hover:shadow-none ml-auto text-xs">
          <div className="indicator">
            Edit Offer
          </div>
        </label>
      </div>
      <div className="drawer-side z-50">
        <label htmlFor="edit-offer-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 w-[350px] lg:w-[400px] min-h-full text-base-content rounded-xl bg-base">
          <header className="flex items-center">
            <h4 className={`${lusitana.className} text-2xl font-bold`}>Edit Offer</h4>
            <label htmlFor="edit-offer-drawer" className="btn btn-circle btn-sm ml-auto">
              <XMarkIcon className="w-4" />
            </label>
          </header>

          <EditOfferForm offer={offer} />
        </ul>
      </div>
    </div>
  )
}

export default EditOfferModal;