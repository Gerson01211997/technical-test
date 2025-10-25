import { NextResponse } from 'next/server';
import { RESPONSE_STATUSES } from 'services/mocks/ctx/constants';
import { TOKEN_KEY } from '../login/constants';

export async function POST() {
  try {
    const response = NextResponse.json({ success: true });

    response.cookies.set(TOKEN_KEY, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      expires: new Date(0),
    });

    return response;
  } catch (err) {
    return NextResponse.json(
      { success: false, message: 'Error al cerrar sesión' },
      { status: RESPONSE_STATUSES.INTERNAL_SERVER_ERROR }
    );
  }
}
