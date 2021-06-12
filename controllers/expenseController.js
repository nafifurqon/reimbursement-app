const { QueryTypes } = require("sequelize");
const { Assignment, Employee, Expense } = require("../models");
const alert = require("../responses/alert");

const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll({
      include: "assignment",
    });

    console.log(expenses);

    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };

    res.status(200).render("expense/view-expense", {
      expenses,
      userLogin: req.user.dataValues,
      title: "Reimbursement | Expense",
      alert,
    });
  } catch (error) {
    console.log(error);
    alert.alertDanger(req, res, `${error.message}`, "/expense");
  }
};

// const createAssignment = async (req, res) => {
//   try {
//     const { city, start_date, end_date, description, assigne_id } = req.body;
//     console.log(req.body);

//     await Assignment.create({
//       city,
//       start_date,
//       end_date,
//       description,
//       assignor: req.user.uuid,
//       assignee: assigne_id,
//     });

//     alert.alertSuccess(req, res, "Successfully add assignment.", "/assignment");
//   } catch (error) {
//     console.log(error);
//     alert.alertDanger(req, res, `${error.message}`, "/assignment");
//   }
// };

// const updateAssignment = async (req, res) => {
//   try {
//     // const { uuid, fullName, job, bio, userId } = req.body;
//     const { uuid, city, start_date, end_date, description, assignee } =
//       req.body;
//     console.log(req.body);

//     await Assignment.update(
//       {
//         city,
//         start_date,
//         end_date,
//         description,
//         assignor: req.user.uuid,
//         assignee,
//       },
//       {
//         where: { uuid },
//       }
//     );

//     alert.alertSuccess(
//       req,
//       res,
//       "Successfully update assignment.",
//       "/assignment"
//     );
//   } catch (error) {
//     console.log(error);
//     alert.alertDanger(req, res, `${error.message}`, "/assignment");
//   }
// };

// const deleteAssignment = async (req, res) => {
//   try {
//     console.log(req.params.uuid);
//     const uuid = req.params.uuid;
//     await Assignment.destroy({
//       where: { uuid },
//     });

//     req.flash("alertMessage", "Successfully delete assignment.");
//     req.flash("alertStatus", "success");
//     res.redirect("/assignment");
//   } catch (error) {
//     console.log(error);
//     req.flash("alertMessage", `${error.message}.`);
//     req.flash("alertStatus", "danger");
//     res.redirect("/assignment");
//   }
// };

module.exports = {
  getAllExpenses,
  // createAssignment,
  // updateAssignment,
  // deleteAssignment,
};
