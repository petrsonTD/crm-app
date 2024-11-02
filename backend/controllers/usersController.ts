import mysql from 'mysql2/promise';
import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import { nanoid } from 'nanoid';
import { AuthTokenI, PasswordI, RegisterErrorsI } from '../intefaces/interfaces.ts';
import { activeUsers } from '../middleware/authMiddleware.ts';
import { isValidPassword } from '../utils/auth.ts';

const dbConnections = () => ({
    host: process.env.DB_HOST as string,
    port: parseInt(process.env.DB_PORT as string, 10),
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string
});

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// GET users
export const getUsers = async (req: Request, res: Response): Promise<void> => {
    let connection;

    if (
        req.cookies.authToken?.userRankId === 'UPcP28pg9P5fW6NGhC5IT' || // userRankId of support
        req.cookies.authToken?.userRankId === 'MFM8AH7qpOfYpJHCTTehl' // userRankId of admin
    ) {
        try {
            connection = await mysql.createConnection(dbConnections());
            const [results]: any = await connection.execute(
                `SELECT users.id, users.username, users.email, users.userRankId, usersData.firstName, usersData.lastName, usersData.street, usersData.psc, usersData.city
                FROM users
                LEFT JOIN usersData ON users.id = usersData.userId`
            );

            res.status(200).json({ users: results });
            return;
        } catch (error) {
            console.log('Error:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        } finally {
            if (connection) {
                await connection.end();
            }
        }
    } else {
        res.status(401).json({ isAuthenticated: false });
        return;
    }
};

// GET user
export const getUser = async (req: Request, res: Response): Promise<void> => {
    let connection;
    const userId = req.params.id;

    //condition that prevents customer get someone else data
    if (
        (userId === req.cookies.authToken?.userId) ||
        req.cookies.authToken?.userRankId === 'UPcP28pg9P5fW6NGhC5IT' || // userRankId of support
        req.cookies.authToken?.userRankId === 'MFM8AH7qpOfYpJHCTTehl' // userRankId of admin
    ) {
        try {
            connection = await mysql.createConnection(dbConnections());
            const [results]: any = await connection.execute(
                `SELECT users.id, users.username, users.email, users.userRankId, usersData.firstName, usersData.lastName, usersData.street, usersData.psc, usersData.city
                FROM users
                LEFT JOIN usersData ON users.id = usersData.userId
                WHERE users.id = ?`,
                [userId]
            );

            if (results.length > 0) {
                res.status(200).json(results[0]);
                return;
            } else {
                res.status(200).json({ message: `No user with id: ${userId}` });
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
    } else {
        res.status(401).json({ isAuthenticated: false });
        return;
    }
};

// PATCH user data
export const updateUserData = async (req: Request, res: Response): Promise<void> => {
    const { id, email, password, firstName, lastName, street, psc, city } = req.body;
    const userId = id;

    let user;
    let connection;
    let errors: RegisterErrorsI = {};

    //condition that prevents customer update someone else data
    if (
        (userId === req.cookies.authToken?.userId) ||
        req.cookies.authToken?.userRankId === 'UPcP28pg9P5fW6NGhC5IT' || // userRankId of support
        req.cookies.authToken?.userRankId === 'MFM8AH7qpOfYpJHCTTehl' // userRankId of admin
    ) {
        if (!email) {
            errors.email = 'Missing email.';
        }

        if (email && !emailRegex.test(email)) {
            errors.email = 'Invalid email.';
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

        if (!password) {
            errors.password = 'Wrong password.';
        }

        if (Object.keys(errors).length > 0) {
            res.status(422).json({
                message: 'Changing user data failed due to validation errors.',
                errors,
            });
            return;
        }

        try {
            connection = await mysql.createConnection(dbConnections());
            const [results]: any = await connection.execute(
                `SELECT users.id, users.username, users.email, users.password, users.userRankId, usersData.lastName, usersData.firstName
                FROM users
                LEFT JOIN usersData ON users.id = usersData.userId
                WHERE users.id = ?`,
                [userId]
            );

            if (results.length === 0) {
                res.status(500).json({ message: 'Internal server error' });
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
            res.status(422).json({
                message: 'Changing user data failed due to validation errors.',
                errors: { password: 'Wrong password.' }
            });
            return;
        }

        try {
            connection = await mysql.createConnection(dbConnections());
            await connection.beginTransaction();
            await connection.execute(
                'UPDATE users SET email = ? WHERE id = ?',
                [email, userId]
            );

            await connection.execute(
                'UPDATE usersData SET firstName = ?, lastName = ?, street = ?, psc = ?, city = ? WHERE userId = ?',
                [firstName, lastName, street, psc, city, userId]
            );

            await connection.commit();

            const authToken: AuthTokenI = {
                sessionId: nanoid(),
                userId: userId,
                userRankId: user.userRankId
            };
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
    } else {
        res.status(401).json({ isAuthenticated: false });
        return;
    }
};

// PATCH user password
export const updateUserPassword = async (req: Request, res: Response): Promise<void> => {
    const { id, oldPassword, newPassword, confirmNewPassword } = req.body;
    const userId = id;

    let user;
    let connection;
    let errors: PasswordI = {};

    //condition that prevents customer update someone else data
    if (
        (userId === req.cookies.authToken?.userId) ||
        req.cookies.authToken?.userRankId === 'UPcP28pg9P5fW6NGhC5IT' || // userRankId of support
        req.cookies.authToken?.userRankId === 'MFM8AH7qpOfYpJHCTTehl' // userRankId of admin
    ) {
        if (!oldPassword) {
            errors.oldPassword = 'Wrong password.';
        }

        if (!newPassword) {
            errors.newPassword = 'Missing new password.';
        }

        if (!confirmNewPassword) {
            errors.confirmNewPassword = 'Missing confirmation password.';
        }

        if (Object.keys(errors).length > 0) {
            res.status(422).json({
                message: 'Changing password failed due to validation errors.',
                errors,
            });
            return;
        }

        try {
            connection = await mysql.createConnection(dbConnections());
            const [results]: any = await connection.execute(
                `SELECT users.id, users.password
                FROM users
                WHERE users.id = ?`,
                [userId]
            );

            if (results.length === 0) {
                res.status(500).json({ message: 'Internal server error' });
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

        const pwIsValid = await isValidPassword(oldPassword, user.password);

        if (!pwIsValid) {
            res.status(422).json({
                message: 'Changing password failed due to validation errors.',
                errors: { password: 'Wrong password.' }
            });
            return;
        }

        const hashedNewPw = await bcryptjs.hash(newPassword, 12);

        try {
            connection = await mysql.createConnection(dbConnections());
            await connection.beginTransaction();
            await connection.execute(
                'UPDATE users SET password = ? WHERE id = ?',
                [hashedNewPw, userId]
            );

            await connection.commit();

            const authToken: AuthTokenI = {
                sessionId: nanoid(),
                userId: userId,
                userRankId: user.userRankId
            };
            activeUsers.push(authToken);

            res.cookie('authToken', authToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 60 * 60 * 1000
            });

            res.status(200).json({
                message: 'Password changed successfully.'
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
    } else {
        res.status(401).json({ isAuthenticated: false });
        return;
    }
};
