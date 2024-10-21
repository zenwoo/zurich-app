import ColumnSort from '../commons/data-table/ColumnSort';
import EmailLabel from '../commons/EmailLabel';
import UserAvatarColumn from './UserAvatarColumn';

const userColumns = [
  {
    accessorKey: 'avatar',
    enableColumnFilter: false,
    header: 'Avatar',
    cell: ({ row }) => {
      const imageUrl = row.getValue('avatar');
      const firstName = row.getValue('first_name');
      const lastName = row.getValue('last_name');

      return (
        <UserAvatarColumn imageUrl={imageUrl} firstName={firstName} lastName={lastName} />
      );
    }
  },
  {
    accessorKey: 'first_name',
    header: ({ column }) => (
      <ColumnSort column={column} header="First name" />
    ),
    meta: {
      header: 'First name'
    }
  },
  {
    accessorKey: 'last_name',
    header: ({ column }) => (
      <ColumnSort column={column} header="Last name" />
    ),
    meta: {
      header: 'Last name'
    }
  },
  {
    accessorKey: 'email',
    cell: ({ row }) => (
      <EmailLabel text={row.getValue('email')} />
    ),
    header: ({ column }) => (
      <ColumnSort column={column} header="Email" />
    ),
    meta: {
      header: 'Email'
    }
  }
];

export default userColumns;
