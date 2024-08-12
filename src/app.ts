import bodyParser from 'body-parser';
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { adminRouter } from './routes/admin/authRoutes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

export const app: Express = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
	res.send({ message: 'Welcome to OrderUp API' });
});

app.use('/api/v1/auth', adminRouter);

app.all('*', notFoundHandler);

app.use(errorHandler);