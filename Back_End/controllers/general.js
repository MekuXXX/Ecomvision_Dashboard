const { asyncWrapper } = require('../middleware');
const { User } = require('../models');
const getUser = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json({ user });
});

module.exports = { getUser };
