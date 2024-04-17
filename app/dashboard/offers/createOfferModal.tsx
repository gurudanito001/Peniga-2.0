import { lusitana } from "@/app/ui/fonts";
import { XMarkIcon } from "@heroicons/react/24/outline";

const CreateOfferModal = () => {
  return (
    <div className="drawer drawer-end w-24 ml-auto">
      <input id="create-offer-drawer" type="checkbox" className="drawer-toggle" />
      <div className=''>
        {/* Page content here */}
        <label htmlFor="create-offer-drawer" className="btn btn-sm btn-outline rounded-lg border-primary text-primary hover:bg-primary hover:text-white shadow-lg hover:shadow-none ml-auto text-xs">
          <div className="indicator">
            + Add New
          </div>
        </label>
      </div>
      <div className="drawer-side z-50">
        <label htmlFor="create-offer-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 w-[350px] lg:w-[400px] min-h-full text-base-content rounded-xl bg-base">
          <header className="flex items-center">
            <h4 className={`${lusitana.className} text-2xl font-bold`}>Create Offer</h4>
            <label htmlFor="create-offer-drawer" className="btn btn-circle btn-sm ml-auto">
              <XMarkIcon className="w-4" />
            </label>
          </header>

          <form className="mt-10">
            <label className="form-control w-full mb-4">
              <div className="label">
                <span className="label-text">You want to:</span>
              </div>
              <select className="select select-bordered rounded-lg w-full" defaultValue="">
                <option value="" disabled>Buy / Sell</option>
                <option value="buy">Buy Giftcard</option>
                <option value="sell">Sell Giftcard</option>
              </select>
            </label>

            <label className="form-control w-full mb-4">
              <div className="label">
                <span className="label-text">Select Giftcard</span>
              </div>
              <select className="select select-bordered rounded-lg w-full" defaultValue="">
                <option disabled value="">Choose GiftCard</option>
                <option value="sephora">Sephora</option>
                <option value="amazon">Amazon</option>
              </select>
            </label>


            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Rate in ₦</span>
              </div>
              <input type="number" placeholder="" className="input input-bordered rounded-lg w-full" />
            </label>

            <button className="btn w-full bg-primary rounded-lg mt-12 text-white hover:bg-primary hover:text-white hover:shadow-xl">Create</button>
          </form>
        </ul>
      </div>
    </div>
  )
}

export default CreateOfferModal;