import express from 'express';
import bodyParser from 'body-parser';
import { checkAuth, login, logout, register } from '../controllers/authController.ts';

const jsonParser = bodyParser.json();
export const authRoutes = express.Router();

// GET login
authRoutes.get('/check-auth', jsonParser, checkAuth);

// POST login
authRoutes.post('/login', jsonParser, login);

// POST logout
authRoutes.post('/logout', jsonParser, logout);

// POST signup
authRoutes.post('/signup', jsonParser, register);
