import bcryptjs from 'bcryptjs';

export function isValidPassword(password: string, storedPassword: string) {
    return bcryptjs.compare(password, storedPassword);
}
