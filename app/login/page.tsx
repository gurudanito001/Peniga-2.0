import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';

import { Metadata } from 'next';
import styles from '../styles.module.css';
 
export const metadata: Metadata = {
  title: 'Login',
};
 
export default function LoginPage() {
  return (
    <main className={`${styles.loginBg} flex items-center justify-center md:h-screen`}>
      <div className='h-full w-full glass flex items-center justify-center border border-red-500 px-5 lg:px-16'>
        <LoginForm />
      </div>
    </main>
    
  );
}