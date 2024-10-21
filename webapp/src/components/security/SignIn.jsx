'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import { Button } from '../shadcn-ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '../shadcn-ui/card';

export default function SignIn() {
  const searchParams = useSearchParams();

  const handleSignInClick = () => {
    signIn('google', {
      redirectTo: searchParams.get('callbackUrl')
    });
  };

  return (
    <Card className="p-4 w-[400px]">
      <CardHeader>
        <CardTitle>
          Login to your Account
        </CardTitle>
        <CardDescription>Hi, welcome back</CardDescription>
      </CardHeader>
      <CardFooter className="p-4">
        <Button className="min-w-80 font-semibold" variant="outline" onClick={handleSignInClick}>
          <Image alt="Google logo" height={24} width={24} src="https://authjs.dev/img/providers/google.svg" />
          <span className="ml-2">Sign in with Google</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
