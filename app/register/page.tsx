import AcmeLogo from '@/app/ui/acme-logo';
import RegisterForm from '@/app/ui/register-form';

import { Metadata } from 'next';
import styles from '../styles.module.css';
 
export const metadata: Metadata = {
  title: 'Register',
};
 
export default function RegisterPage() {
  return (
    <main className={`${styles.loginBg} flex items-center justify-center md:h-screen`}>
      <div className='h-full w-full glass flex items-center justify-center border border-red-500 px-5 lg:px-16'>
        <RegisterForm />
      </div>
    </main>
    
  );
}