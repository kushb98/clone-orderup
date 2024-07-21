import bodyParser from 'body-parser';
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';

export const app: Express = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
	res.send({ message: 'Welcome to OrderUp API' });
});
