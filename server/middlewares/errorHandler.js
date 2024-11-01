const errorHandler = (error, req, res, next) => {
    console.log(error);

    let status = 500;
    let message = 'Internal server error';

    if (error.name === 'SequelizeUniqueConstraintError' || error.name === 'SequelizeValidationError') {
        status = 400;
        message = error.errors[0].message;
    } else if (error.name === 'BadRequest') {
        status = 400;
        message = 'Please input email or password';
    } else if (error.name === 'LoginError') {
        status = 400;
        message = 'Invalid email or password';
    } else if (error.name === 'Unauthorized' || error.name === 'JsonWebTokenError') {
        status = 401;
        message = 'Invalid token or unauthorized';
    } else if (error.name === 'Forbidden') {
        status = 403;
        message = 'You are not authorized';
    } else if (error.name === 'NotFound') {
        status = 404;
        message = 'Data not found';
    }

    res.status(status).json({
        message
    });
};

module.exports = errorHandler;
