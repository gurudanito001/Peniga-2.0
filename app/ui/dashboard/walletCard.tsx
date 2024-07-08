import WalletContent from './walletContent';
import { auth } from '@/auth';
import { getUserByEmail } from '@/app/lib/data';




const WalletCard = async (/* {user, walletBalance}: {user: any, walletBalance: any} */) => {
  const session = await auth();
  const user: any = await getUserByEmail(session?.user?.email);

  return (
    <section className='mt-4 mb-6 w-full'>
      <div className='w-full'>
        {/* <WalletContent banks={banks} user={user} walletBalance={walletBalance} /> */}
      </div>
    </section>
  )
}

export default WalletCard




