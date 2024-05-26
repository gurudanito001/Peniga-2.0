import WalletContent from './walletContent';
import { auth } from '@/auth';
import { getUserByEmail, getWalletBalance } from '@/app/lib/data';
import { getBanks } from '@/app/lib/data';
import { getUserBalance } from '@/app/lib/data';




const WalletCard = async (/* {user, walletBalance}: {user: any, walletBalance: any} */) => {
  const session = await auth();
  const user: any = await getUserByEmail(session?.user?.email);
  const walletBalance = await getUserBalance(user?.id, )
  const banks = await getBanks();

  return (
    <section className='mt-4 mb-6 w-full'>
      <div className='w-full'>
        <WalletContent banks={banks} user={user} walletBalance={walletBalance} />
      </div>
    </section>
  )
}

export default WalletCard




