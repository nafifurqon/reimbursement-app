const { QueryTypes } = require("sequelize");
const { Assignment, Employee, Expense, Reimbursement } = require("../models");
const alert = require("../responses/alert");

const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll({
      include: "assignment",
    });

    const assignments = await Assignment.findAll();

    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };

    res.status(200).render("expense/view-expense", {
      expenses,
      assignments,
      userLogin: req.user.dataValues,
      title: "Reimbursement | Expense",
      alert,
    });
  } catch (error) {
    console.log(error);
    alert.alertDanger(req, res, `${error.message}`, "/expense");
  }
};

const createExpense = async (req, res) => {
  try {
    const { description, date, price, receipt, assignment_id } = req.body;

    await Expense.create({
      description,
      date,
      price,
      receipt,
      assignment_id,
    });

    const expenses = await Expense.findAll({ where: { assignment_id } });
    // console.log(expenses);
    let total = 0;

    expenses.forEach((item) => {
      total += item.price;
    });

    if (expenses.length === 1) {
      await Reimbursement.create({
        total,
        dokumen: "document.pdf",
        assignment_id,
        status_id: "7a64b5a1-6762-4b10-85e5-671e7476f78c",
      });
    } else if (expenses.length > 1) {
      await Reimbursement.update(
        {
          total,
        },
        {
          where: { assignment_id },
        }
      );
    }

    alert.alertSuccess(req, res, "Successfully add expense.", "/expense");
  } catch (error) {
    console.log(error);
    alert.alertDanger(req, res, `${error.message}`, "/expense");
  }
};

const updateExpense = async (req, res) => {
  try {
    const { uuid, description, date, price, receipt, assignment_id } = req.body;

    await Expense.update(
      {
        description,
        date,
        price,
        receipt,
        assignment_id,
      },
      {
        where: { uuid },
      }
    );

    alert.alertSuccess(req, res, "Successfully update expense.", "/expense");
  } catch (error) {
    console.log(error);
    alert.alertDanger(req, res, `${error.message}`, "/expense");
  }
};

const deleteExpense = async (req, res) => {
  try {
    console.log(req.params.uuid);
    const uuid = req.params.uuid;
    await Expense.destroy({
      where: { uuid },
    });

    req.flash("alertMessage", "Successfully delete expense.");
    req.flash("alertStatus", "success");
    res.redirect("/expense");
  } catch (error) {
    console.log(error);
    req.flash("alertMessage", `${error.message}.`);
    req.flash("alertStatus", "danger");
    res.redirect("/expense");
  }
};

module.exports = {
  getAllExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
};
