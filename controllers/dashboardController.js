const getDashboard = async (req, res) => {
  try {
    res.status(200).render("dashboard/index", {
      title: "Reimbursement app | home",
      userLogin: req.user.dataValues,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDashboard,
};
