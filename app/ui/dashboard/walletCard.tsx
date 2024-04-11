
import { PaperAirplaneIcon, PlusIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';



const WalletCard = () => {
  return (
    <section className='my-4'>
      <div className="card w-100 max-w-sm bg-primary glass text-base-300 shadow-lg">
        <div className="card-body flex flex-row items-start ">
          <div className=''>
            <dl>
              <dt className='text-xs font-bold'>
                Ledger Balance
              </dt>

              <dd className={`${lusitana?.className} d-flex align-middle font-bold md:text-lg`}>₦245,000 </dd>

              <dt className='text-xs font-bold mt-3'>Available Balance</dt>
              <dd className={`${lusitana?.className} text-2xl md:text-3xl font-extrabold`}>₦45,000</dd>
            </dl>
          </div>

          <div className="flex flex-col ml-auto gap my-auto">
            <button className="block btn btn-sm glass hover:glass text-xs text-base-100">Send <PaperAirplaneIcon className="w-3 ml-1 inline" /></button>
            <button className="block btn btn-sm glass hover:glass text-xs text-base-300 mt-5">Add Funds  <PlusIcon className="w-3 ml-1 inline" /></button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WalletCard