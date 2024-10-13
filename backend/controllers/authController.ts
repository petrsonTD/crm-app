import { nanoid } from 'nanoid';
import bcryptjs from 'bcryptjs';
import mysql from 'mysql2/promise';
import { isValidPassword } from '../utils/auth.ts';
import { includesObject } from '../utils/functions.ts';
import { Request, Response } from 'express';
import { AuthTokenI, SingUpErrorsI } from '../intefaces/interfaces.ts';

const activeUsers: AuthTokenI[] = [];

const dbConnections = () => ({
    host: process.env.DB_HOST as string,
    port: parseInt(process.env.DB_PORT as string, 10),
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string
});

// checkAuth
export const checkAuth = async (req: Request, res: Response): Promise<void> => {
    const authToken: any = req.cookies.authToken;

    if (req.cookies.authToken?.userId) {
        const userId = req.cookies.authToken?.userId;

        let user;
        let connection;

        try {
            connection = await mysql.createConnection(dbConnections());
            const [results]: any = await connection.execute('SELECT * FROM users WHERE id = ?', [userId]);
            if (results.length === 0) {
                res.status(401).json({ isAuthenticated: false });
                return;
            }

            user = results[0];

        } catch (error) {
            console.log('Error:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        } finally {
            if (connection) {
                await connection.end();
            }
        }

        if (includesObject(activeUsers, authToken)) {
            res.json({
                isAuthenticated: true,
                username: user.username
            });
            return;
        } else {
            res.status(401).json({ isAuthenticated: false });
            return;
        }
    } else {
        res.status(401).json({ isAuthenticated: false });
        return;
    }
};

// login
export const login = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    let user;
    let connection;

    if (!username || !password) {
        res.status(401).json({
            errors: {
                username: 'Invalid credentials',
                password: 'Invalid credentials'
            }
        });
        return;
    }

    try {
        connection = await mysql.createConnection(dbConnections());
        const [results]: any = await connection.execute('SELECT * FROM users WHERE username = ?', [username]);

        if (results.length === 0) {
            res.status(401).json({
                errors: {
                    username: 'Invalid credentials',
                    password: 'Invalid credentials'
                }
            });
            return;
        }

        user = results[0];
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    } finally {
        if (connection) {
            await connection.end();
        }
    }

    const pwIsValid = await isValidPassword(password, user.password);

    if (!pwIsValid) {
        res.status(401).json({
            errors: {
                username: 'Invalid credentials',
                password: 'Invalid credentials'
            }
        });
        return;
    }

    if (user && pwIsValid) {
        const authToken: AuthTokenI = { sessionId: nanoid(), userId: user.id };

        activeUsers.push(authToken);

        res.cookie('authToken', authToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 5 * 60 * 1000
        });

        res.status(200).json({ username });
        return;
    }

    res.status(500).json({ message: 'Internal server error' });
};

// signup
export const signup = async (req: Request, res: Response): Promise<void> => {
    const { username, password, confirmPassword } = req.body;
    let user;
    let connection;
    let errors: SingUpErrorsI = {};

    try {
        connection = await mysql.createConnection(dbConnections());
        const [results]: any = await connection.execute('SELECT * FROM users WHERE username = ?', [username]);

        if (user) {
            errors.username = 'Username already exists.';
        }

        user = results[0];
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    } finally {
        if (connection) {
            await connection.end();
        }
    }

    if (password.length < 6) {
        errors.password = 'Ivalid password. Must be at least 6 characters long.';
    }

    if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords aren\'t same.';
    }

    if (Object.keys(errors).length > 0) {
        res.status(422).json({
            message: 'User signup failed due to validation errors.',
            errors,
        });
        return;
    }

    const newUserId = nanoid();
    const hashedPw = await bcryptjs.hash(password, 12);

    try {
        connection = await mysql.createConnection(dbConnections());
        await connection.execute(
            'INSERT INTO users (id, username, password, userRank) VALUES (?, ?, ?, ?)',
            [newUserId, username, hashedPw, 'customer']
        );
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    } finally {
        const authToken: AuthTokenI = { sessionId: nanoid(), userId: newUserId };

        activeUsers.push(authToken);

        res.cookie('authToken', authToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 5 * 60 * 1000
        });

        res.status(200).json({ username });

        if (connection) {
            await connection.end();
        }
    }
};
