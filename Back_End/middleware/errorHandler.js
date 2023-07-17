const { StatusCodes } = require('http-status-codes');
const errorHandler = (err, req, res, next) => {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: err.message });
};

module.exports = errorHandler;
