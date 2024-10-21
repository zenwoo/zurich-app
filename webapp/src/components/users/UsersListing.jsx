'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { fetchUsers } from './usersSlice';
import DataTable from '../commons/DataTable';
import userColumns from './userColumns';

export default function UsersListing() {
  const dispatch = useDispatch();
  const { status, users } = useSelector((state) => (
    state.users
  ));

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [
    status,
    dispatch
  ]);

  return (
    <div className="p-6 rounded shadow-md min-h-svh">
      <DataTable columns={userColumns} data={users?.data ?? []} />
    </div>
  );
}
