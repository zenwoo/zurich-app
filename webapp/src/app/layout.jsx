import StoreProvider from '../components/StoreProvider';
import './globals.css';

export const metadata = {
  title: 'Zurich Customer Portal',
  description: 'Explore Zurich\'s new customer portal'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
