const errorMiddleware = (err, req, res, next) => {
    try{
        let error = { ...err };

        error.message = err.message || 'An unexpected error occurred';

        // Log the error
        console.error('Error:', error);

        // Mongoose bad ObjectId
        if(err.name === 'CastError') {
            const message = 'Resource not found';
            error = new Error(message);
            error.statusCode = 404;
        }

        // Mongoose duplicate key error
        if(err.code === 11000) {
            const message = 'Duplicate field value entered';
            error = new Error(message);
            error.statusCode = 400;
        }

        // Mongoose validation error
        if(err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(val => val.message).join(', ');
            error = new Error(message);
            error.statusCode = 400;
        }

        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Internal Server Error',
            stack: process.env.NODE_ENV === 'development' ? error.stack : {}
        });
    } catch (error) {
        console.error('Error in error middleware:', error);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message || 'An unexpected error occurred'
        });
        next(error);
    }
}

export default errorMiddleware;