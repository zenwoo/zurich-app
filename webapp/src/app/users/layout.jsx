import { SessionProvider } from 'next-auth/react';

import Footer from '../../components/commons/Footer';
import Header from '../../components/commons/Header';

export default function UsersLayout({ children }) {
  return (
    <SessionProvider>
      <Header title="Users" />
      <div className="container lg:pt-6 lg:pb-6 lg:px-48 mx-auto min-h-fit">
        {children}
      </div>
      <Footer />
    </SessionProvider>
  );
}
