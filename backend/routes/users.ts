import express from 'express';
import { getUser, getUsers, updateUserData, updateUserPassword } from '../controllers/usersController.ts';
import authMiddleware from '../middleware/authMiddleware.ts';

export const usersRoutes = express.Router();

// GET users
usersRoutes.get('/', authMiddleware, getUsers);

// GET user
usersRoutes.get('/:id', authMiddleware, getUser);

// PATCH user data
usersRoutes.patch('/user-data', authMiddleware, updateUserData);

// PATCH user password
usersRoutes.patch('/user-password', authMiddleware, updateUserPassword);
