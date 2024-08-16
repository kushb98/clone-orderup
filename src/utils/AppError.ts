class AppError extends Error {
    statusCode: number;
    status: string;
    isOperational: boolean;

    /**
     * Custom error class for handling application-specific errors.
     * 
     * @param {string} message - The error message.
     * @param {number} statusCode - The HTTP status code.
     */
    constructor(message: string, statusCode: number) {
        super(); // Call the parent class (Error) constructor.
        this.message = message; // Set the error message.
        this.statusCode = statusCode; // Set the HTTP status code.

        // Determine the status based on the status code.
        // If the status code starts with '4', it is a client error (fail).
        // Otherwise, it's a server error (error).
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

        // Mark the error as operational (trusted error).
        // Operational errors are those that are expected and handled gracefully.
        this.isOperational = true;

        // Capture the stack trace to preserve the original error location.
        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;