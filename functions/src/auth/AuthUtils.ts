import * as crypto from 'crypto';
import { v4 } from 'uuid';

import { AUTH_MESSAGE } from './AuthConstants';

const secret = v4();

// Get challenge
export const generateChallenge = (authAddress: string) => {
    const challenge = crypto
        .createHmac('sha256', secret)
        .update(authAddress + v4())
        .digest('hex');

    return {
        purpose: AUTH_MESSAGE,
        challenge
    };
};
