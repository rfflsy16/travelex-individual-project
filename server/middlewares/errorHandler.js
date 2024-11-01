const errorHandler = (error, req, res, next) => {
    console.log(error);

    let status = 500;
    let message = 'Internal server error';

    if (error.name === 'SequelizeUniqueConstraintError' || error.name === 'SequelizeValidationError') {
        status = 400;
        message = error.errors[0].message;
    }

    if (error.name === 'BadRequest') {
        status = 400;
        message = 'Please input email or password';
    }

    if (error.name === 'LoginError') {
        status = 400;
        message = 'Invalid email or password';
    }

    if (error.name === 'Unauthorized') {
        status = 401;
        message = 'Invalid email/password';
    }

    if (error.name === 'Unauthorized' || error.name === 'JsonWebTokenError') {
        status = 401;
        message = 'Invalid token';
    }

    if (error.name === 'Forbidden') {
        status = 403;
        message = 'You are not authorized';
    }

    if (error.name === 'NotFound') {
        status = 404;
        message = 'Data not found';
    }

    res.status(status).json({
        message
    });
};

module.exports = errorHandler;