import express from 'express';
import { checkAuth, login, logout, register } from '../controllers/authController.ts';

export const authRoutes = express.Router();

// GET login
authRoutes.get('/check-auth', checkAuth);

// POST login
authRoutes.post('/login', login);

// POST logout
authRoutes.post('/logout', logout);

// POST signup
authRoutes.post('/signup', register);
