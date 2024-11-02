import { nanoid } from 'nanoid';
import bcryptjs from 'bcryptjs';
import mysql from 'mysql2/promise';
import { isValidPassword } from '../utils/auth.ts';
import { Request, Response } from 'express';
import { AuthTokenI, RegisterErrorsI } from '../intefaces/interfaces.ts';
import { activeUsers } from '../middleware/authMiddleware.ts';
import { includesObject } from '../utils/functions.ts';

const dbConnections = () => ({
    host: process.env.DB_HOST as string,
    port: parseInt(process.env.DB_PORT as string, 10),
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string
});

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// checkAuth
export const checkAuth = async (req: Request, res: Response): Promise<void> => {
    const authToken: AuthTokenI = req.cookies.authToken;

    if (req.cookies.authToken?.userId) {
        const userId = req.cookies.authToken?.userId;

        let user;
        let connection;

        try {
            connection = await mysql.createConnection(dbConnections());
            const [results]: any = await connection.execute(
                `SELECT users.id, users.username, users.userRankId, usersData.lastName, usersData.firstName
                 FROM users
                 LEFT JOIN usersData ON users.id = usersData.userId
                 WHERE users.id = ?`,
                [userId]
            );
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
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName
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
        const [results]: any = await connection.execute(
            `SELECT users.id, users.username, users.password, users.userRankId, usersData.lastName, usersData.firstName
            FROM users
            LEFT JOIN usersData ON users.id = usersData.userId
            WHERE users.username = ?`,
            [username]
        );

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
        const authToken: AuthTokenI = { sessionId: nanoid(), userId: user.id, userRankId: user.userRankId };

        activeUsers.push(authToken);

        res.cookie('authToken', authToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000
        });

        res.status(200).json({
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName
        });
        return;
    }

    res.status(500).json({ message: 'Internal server error' });
};

// logout
export const logout = async (req: Request, res: Response): Promise<void> => {
    const authToken: AuthTokenI = req.cookies.authToken;

    if (!authToken?.userId) {
        res.status(401).json({ message: 'User is not authenticated.' });
        return;
    }

    const userIndex = activeUsers.findIndex(user => user.sessionId === authToken.sessionId);
    if (userIndex !== -1) {
        activeUsers.splice(userIndex, 1);
    }

    res.clearCookie('authToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
    });

    res.status(200).json({ message: 'User logged out successfully.' });
};

// register
export const register = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password, confirmPassword, firstName, lastName, street, psc, city } = req.body;
    let connection;
    let errors: RegisterErrorsI = {};

    try {
        if (!username) {
            errors.username = 'Missing username.';
        }

        connection = await mysql.createConnection(dbConnections());
        const [results]: any = await connection.execute('SELECT * FROM users WHERE username = ?', [username]);

        if (results.length > 0) {
            errors.username = 'Username already exists.';
        }
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    } finally {
        if (connection) {
            await connection.end();
        }
    }

    if (!email) {
        errors.email = 'Missing email.';
    }

    if (email && !emailRegex.test(email)) {
        errors.email = 'Invalid email.';
    }

    if (password.length < 6) {
        errors.password = 'Password must be at least 6 characters long.';
    }

    if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords aren\'t same.';
    }

    if (!confirmPassword) {
        errors.confirmPassword = 'Repeated password can\'t be empty.';
    }

    if (!firstName) {
        errors.firstName = 'Missing First Name.';
    }

    if (!lastName) {
        errors.lastName = 'Missing Last Name.';
    }

    if (!street) {
        errors.street = 'Missing street name.';
    }

    if (!psc) {
        errors.psc = 'Missing psc.';
    }

    if (!city) {
        errors.city = 'Missing city.';
    }


    if (Object.keys(errors).length > 0) {
        res.status(422).json({
            message: 'User signup failed due to validation errors.',
            errors,
        });
        return;
    }

    const newUserId = nanoid();
    const newUserDataId = nanoid();
    const hashedPw = await bcryptjs.hash(password, 12);

    try {
        connection = await mysql.createConnection(dbConnections());
        await connection.beginTransaction();
        await connection.execute(
            'INSERT INTO users (id, username, email, password, userRankId) VALUES (?, ?, ?, ?)',
            [newUserId, username, hashedPw, 'UPcP28pg9P5fW6NGhC5IT'] // userRankId of support // TODO change it so it would be dynamic
        );

        await connection.execute(
            'INSERT INTO usersData (id, userId, lastName, firstName, street, psc, city) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [newUserDataId, newUserId, lastName, firstName, street, psc, city]
        );

        await connection.commit();

        const authToken: AuthTokenI = {
            sessionId: nanoid(),
            userId: newUserId,
            userRankId: 'UPcP28pg9P5fW6NGhC5IT'
        }; // userRankId of support // TODO change it so it would be dynamic

        activeUsers.push(authToken);

        res.cookie('authToken', authToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000
        });

        res.status(200).json({
            id: newUserId,
            username: username,
            firstName: firstName,
            lastName: lastName
        });
    } catch (error) {
        if (connection) {
            await connection.rollback();
        }

        console.log('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    } finally {
        if (connection) {
            await connection.end();
        }
    }
};
