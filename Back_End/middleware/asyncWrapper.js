const asyncWrapper = (fun) => {
    return async (req, res, next) => {
        try {
            await fun(req, res, next);
            next();
        } catch (err) {
            next(err);
        }
    };
};

module.exports = asyncWrapper;
