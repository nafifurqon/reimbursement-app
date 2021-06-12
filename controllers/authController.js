const passport = require("passport");

const defaultAdmin = {
  username: "farhan",
  password: "PassFarhan",
};

const getLoginPage = async (req, res) => {
  try {
    await res.status(200).render("auth/login", {
      title: "Reimbursement App | Login",
      defaultAdmin,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const actionLogin = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
});

const actionLogout = async (req, res) => {
  try {
    req.logout();
    res.redirect("/login");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { actionLogin, getLoginPage, actionLogout };
