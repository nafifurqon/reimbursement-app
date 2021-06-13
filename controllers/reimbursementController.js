const { QueryTypes } = require("sequelize");
const {
  Assignment,
  Employee,
  Expense,
  Reimbursement,
  Status,
} = require("../models");
const alert = require("../responses/alert");

const getAllReimbursement = async (req, res) => {
  try {
    const reimbursements = await Reimbursement.findAll({
      include: ["assignment", "status"],
    });

    const assignments = await Assignment.findAll();

    const statuses = await Status.findAll();

    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };

    res.status(200).render("reimbursement/view-reimbursement", {
      reimbursements,
      assignments,
      statuses,
      userLogin: req.user.dataValues,
      title: "Reimbursement | Reimbursement",
      alert,
    });
  } catch (error) {
    console.log(error);
    alert.alertDanger(req, res, `${error.message}`, "/reimbursement");
  }
};

const updateReimbursement = async (req, res) => {
  try {
    const { uuid, status_id } = req.body;

    await Reimbursement.update(
      {
        status_id,
      },
      {
        where: { uuid },
      }
    );

    alert.alertSuccess(
      req,
      res,
      "Successfully update reimbursement.",
      "/reimbursement"
    );
  } catch (error) {
    console.log(error);
    alert.alertDanger(req, res, `${error.message}`, "/reimbursement");
  }
};

// const deleteExpense = async (req, res) => {
//   try {
//     console.log(req.params.uuid);
//     const uuid = req.params.uuid;
//     await Expense.destroy({
//       where: { uuid },
//     });

//     req.flash("alertMessage", "Successfully delete expense.");
//     req.flash("alertStatus", "success");
//     res.redirect("/expense");
//   } catch (error) {
//     console.log(error);
//     req.flash("alertMessage", `${error.message}.`);
//     req.flash("alertStatus", "danger");
//     res.redirect("/expense");
//   }
// };

module.exports = {
  getAllReimbursement,
  // createExpense,
  updateReimbursement,
  // deleteExpense,
};
