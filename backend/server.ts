import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { authRoutes } from './routes/auth.ts';
import { usersRoutes } from './routes/users.ts';
import loggerMiddleware from './middleware/loggerMiddleware.ts';

dotenv.config();

const app = express();
const port = process.env.EXPRESS_PORT;

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use(loggerMiddleware);

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);

app.use((req, res) => {
    res.status(500).json({ message: 'Not Found.' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
