import { UserRound } from 'lucide-react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '../shadcn-ui/avatar';

export default function UserAvatarColumn({
  imageUrl,
  firstName,
  lastName
}) {
  return (
    <Avatar>
      <AvatarImage src={`${imageUrl}`} alt={`${firstName} ${lastName}`} />
      <AvatarFallback>
        <UserRound />
      </AvatarFallback>
    </Avatar>
  );
}
