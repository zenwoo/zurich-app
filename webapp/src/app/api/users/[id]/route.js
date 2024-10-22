import { NextResponse } from 'next/server';
import { auth } from '../../../../auth';
import hideEmail from '../../../../lib/hideEmail';

const REQUEST_URL = 'https://reqres.in/api/users';

// eslint-disable-next-line import/prefer-default-export
export const GET = auth(async (request, { params }) => {
  const { searchParams } = request.nextUrl;

  if (!request.auth) {
    return NextResponse.json({
      error: 'Access Denied - You are not authorised to access this resources.'
    }, {
      status: 401
    });
  }

  try {
    const response = await fetch(`${REQUEST_URL}/${params.id}`);
    const result = await response.json();
    const { data } = result;

    const isEmailHidden = searchParams.get('hideEmail');
    const email = isEmailHidden > 0 ? hideEmail(data.email) : data.email;

    const newUser = {
      ...data,
      email
    };

    return NextResponse.json({
      data: newUser
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
