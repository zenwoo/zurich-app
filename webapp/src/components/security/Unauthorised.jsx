'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '../shadcn-ui/button';

export default function Unauthorised() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSignInClick = () => {
    router.push(`/signin?${searchParams}`);
  };

  return (
    <div className="bg-white flex flex-col h-3/5 justify-center p-6 rounded shadow-md w-3/5">
      <div>
        <h1 className="font-bold text-4xl text-center">
          Access Denied
        </h1>
        <h4 className="p-2 text-center">
          You are not authorised to access this page
        </h4>
      </div>
      <div className="pt-4 self-center">
        <Button className="bg-zurich-primary font-semibold text-white" variant="outline" onClick={handleSignInClick}>
          Sign in now
        </Button>
      </div>
    </div>
  );
}
