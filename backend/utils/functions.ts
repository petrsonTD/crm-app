import { AuthTokenI } from '../intefaces/interfaces.ts';

export function includesObject(array: AuthTokenI[], obj: AuthTokenI) {
    return array.some((item: AuthTokenI) => item.sessionId === obj.sessionId && item.userId === obj.userId);
}
