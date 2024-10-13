import express from 'express';
import bodyParser from 'body-parser';
import { checkAuth, login, signup } from '../controllers/authController.ts';

const jsonParser = bodyParser.json();
export const authRoutes = express.Router();

// GET login
authRoutes.get('/check-auth', jsonParser, checkAuth);

// POST login
authRoutes.post('/login', jsonParser, login);

// POST signup
authRoutes.post('/signup', jsonParser, signup);
