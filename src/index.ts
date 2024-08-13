import 'dotenv/config';
import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import { app } from './app';
import env from './utils/validateEnv';

mongoose
	.connect(env.DB_URL)
	.then(() => {
		console.log('Database connected!');
		mongoose.connection.on('disconnected', () => {
			console.log('Database disconnected!!');
		});
		mongoose.connection.on('reconnected', () => {
			console.log('Database reconnecting!');
		});

		app.listen(env.PORT || 5000, () => {
			console.log('Application running on ' + `http://localhost:${env.PORT}`);
		});
	})
	.catch((error: Error) => {
		console.log(error.message);
	});
