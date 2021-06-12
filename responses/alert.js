const alertSuccess = (req, res, message, redirectPath) => {
  req.flash("alertMessage", message);
  req.flash("alertStatus", "success");
  res.redirect(redirectPath);
};

const alertDanger = (req, res, message, redirectPath) => {
  req.flash("alertMessage", message);
  req.flash("alertStatus", "danger");
  res.redirect(redirectPath);
};

module.exports = { alertSuccess, alertDanger };
