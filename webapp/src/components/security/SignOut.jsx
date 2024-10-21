'use client';

import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

import { Button } from '../shadcn-ui/button';

export default function SignOut({ text = 'Sign Out' }) {
  const pathname = usePathname();

  const handleSignOutClick = () => {
    signOut({ redirectTo: `/signin?callbackUrl=${pathname}` });
  };

  return (
    <Button className="flex grow-[1] justify-start pl-2" variant="ghost" onClick={handleSignOutClick}>
      {text}
    </Button>
  );
}
