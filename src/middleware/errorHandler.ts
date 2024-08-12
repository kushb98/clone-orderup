import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/AppError';

/**
 * Global error handler middleware for handling known and unknown errors.
 * 
 * @param {Error} err - The error object.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Response} - The response object with an appropriate status and message.
 */
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        // If the error is an instance of AppError, send a custom error response.
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    }

    // For all other errors, send a generic internal server error response.
    return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
    });
};

/**
 * Middleware for handling 404 not found errors.
 * 
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 */
const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    // Create a new AppError for the 404 not found error.
    const err = new AppError(`Can't find ${req.originalUrl} on this server!`, 404);
    // Pass the error to the next middleware function (which would be the error handler).
    next(err);
};

export { errorHandler, notFoundHandler };