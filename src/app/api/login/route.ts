import { NextRequest, NextResponse } from 'next/server';
import { LOGIN_CREDENTIALS, MESSAGES_FROM_BACKEND, TOKEN_KEY } from './constants';
import { TOKEN } from 'utils/tools';
import { LoginCredentials, LoginResponse } from 'services/repository/hooks/auth/types';
import { RESPONSE_STATUSES } from 'services/mocks/ctx/constants';

export async function POST(request: NextRequest) {
  try {
    const body: LoginCredentials = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: MESSAGES_FROM_BACKEND.required,
        },
        { status: RESPONSE_STATUSES.NOT_FOUND },
      );
    }

    if (email !== LOGIN_CREDENTIALS.email || password !== LOGIN_CREDENTIALS.password) {
      return NextResponse.json(
        {
          success: false,
          message: MESSAGES_FROM_BACKEND.unauthorized,
        },
        { status: RESPONSE_STATUSES.UNAUTHORIZED },
      );
    }

    const response: LoginResponse = {
      token: TOKEN,
    };

    const res = NextResponse.json(response, { status: RESPONSE_STATUSES.OK });

    res.cookies.set({
      name: TOKEN_KEY,
      value: TOKEN,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: MESSAGES_FROM_BACKEND.error,
      },
      { status: RESPONSE_STATUSES.INTERNAL_SERVER_ERROR },
    );
  }
}
