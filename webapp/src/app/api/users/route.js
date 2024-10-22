import { NextResponse } from 'next/server';
import { auth } from '../../../auth';
import hideEmail from '../../../lib/hideEmail';

const REQUEST_URL = 'https://reqres.in/api/users';

const fetchUsers = async (page = 1, users = []) => {
  const response = await fetch(`${REQUEST_URL}?page=${page}`);
  const result = await response.json();
  // eslint-disable-next-line camelcase
  const { data, total_pages } = result;

  const allUsers = [...data, ...users];

  // eslint-disable-next-line camelcase
  if (page >= total_pages) {
    return allUsers;
  }

  return fetchUsers(page + 1, allUsers);
};

// eslint-disable-next-line import/prefer-default-export
export const GET = auth(async (request) => {
  if (!request.auth) {
    return NextResponse.json({
      error: 'Access Denied - You are not authorised to access this resources.'
    }, {
      status: 401
    });
  }

  try {
    const users = await fetchUsers();

    const filteredUsers = users.filter((user) => (
      user.first_name.toLowerCase().startsWith('g')
      || user.last_name.toLowerCase().startsWith('w')
    ));

    const hiddenEmailUsers = filteredUsers.map((user) => (
      {
        ...user,
        email: hideEmail(user.email),
        isEmailHidden: true
      }
    ));

    return NextResponse.json({
      data: hiddenEmailUsers
    }, {
      status: 200
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message
    }, {
      status: 500
    });
  }
});
