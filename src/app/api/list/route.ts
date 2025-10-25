import { NextRequest, NextResponse } from 'next/server';
import { MESSAGES_FROM_BACKEND, TOKEN_INITIALS, TOKEN_KEY } from '../login/constants';
import { RESPONSE_STATUSES } from 'services/mocks/ctx/constants';
import { generateMockData } from 'services/repository/hooks/list/__mocks__';

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get(TOKEN_KEY)?.value;

        if (!token) {
            return NextResponse.json(
                { error: MESSAGES_FROM_BACKEND.tokenRequired },
                { status: RESPONSE_STATUSES.UNAUTHORIZED }
            );
        }

        if (!token.startsWith(TOKEN_INITIALS)) {
            return NextResponse.json(
                { error: MESSAGES_FROM_BACKEND.invalidToken },
                { status: RESPONSE_STATUSES.UNAUTHORIZED }
            );
        }

        const listResponse = generateMockData(2000);
        return NextResponse.json(listResponse, { status: RESPONSE_STATUSES.OK });

    } catch (error) {
        console.error('Error en GET /api/user:', error);
        return NextResponse.json(
            { error: MESSAGES_FROM_BACKEND.error },
            { status: RESPONSE_STATUSES.INTERNAL_SERVER_ERROR }
        );
    }
}
