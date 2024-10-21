'use client';

import { useSession } from 'next-auth/react';
import { UserRound } from 'lucide-react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '../../shadcn-ui/avatar';
import { Label } from '../../shadcn-ui/label';

export default function Username() {
  const { data } = useSession();
  const { email, image, name } = data.user;

  return (
    <div className="flex flex-row p-2">
      <div>
        <Avatar>
          <AvatarImage src={`${image}`} alt={`${name}`} />
          <AvatarFallback>
            <UserRound />
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col ml-4">
        <Label className="pt-1 font-light">{name}</Label>
        <Label className="pt-2">{email}</Label>
      </div>
    </div>
  );
}
