import { Request, Response, NextFunction} from 'express';
import AppError from '../utils/AppError';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
    });
};

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    const err = new AppError(`Can't find ${req.originalUrl} on this server!`, 404);
    next(err);
  };
  
  export { errorHandler, notFoundHandler };