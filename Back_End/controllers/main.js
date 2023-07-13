const getHome = (req, res) => {
  res.status(200).json({ msg: "The request is good is updated" });
};

module.exports = {
  getHome,
};
