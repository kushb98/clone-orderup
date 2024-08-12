import AppError from './AppError';

/**
 * Custom error class for handling 404 Not Found errors.
 * Extends the AppError class.
 */
class NotFoundError extends AppError {
    /**
     * Constructor for the NotFoundError class.
     * 
     * @param {string} message - The error message.
     */
    constructor(message: string) {
        // Call the parent class (AppError) constructor with the message and a 404 status code.
        super(message, 404);
    }
}

export default NotFoundError;