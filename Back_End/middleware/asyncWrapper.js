const asyncWrapper = fun => {
    return async (req, res, next) => {
        try {
            return await fun(req, res, next);
        } catch (err) {
            next(err);
        }
    };
};

module.exports = asyncWrapper;
