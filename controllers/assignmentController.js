const { QueryTypes } = require("sequelize");
const { Assignment, Employee } = require("../models");
const alert = require("../responses/alert");

const getAllAssigments = async (req, res) => {
  try {
    const assignments = await Assignment.findAll({
      include: ["user_assignor", "user_assignee"],
    });
    console.log(assignments);

    // const matches = await Match.findAll({
    //   include: ["user_1", "user_2", "room"],
    // });

    const employees = await Employee.findAll({
      where: { role: "Staff", division: "Field Engineer" },
    });

    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };

    res.status(200).render("assignment/view-assignment", {
      assignments,
      employees,
      userLogin: req.user.dataValues,
      title: "Reimbursement | Assignment",
      alert,
    });
  } catch (error) {
    console.log(error);
    alert.alertDanger(req, res, `${error.message}`, "/assignment");
  }
};

const createAssignment = async (req, res) => {
  try {
    const { city, start_date, end_date, description, assigne_id } = req.body;
    console.log(req.body);

    await Assignment.create({
      city,
      start_date,
      end_date,
      description,
      assignor: req.user.uuid,
      assignee: assigne_id,
    });

    alert.alertSuccess(
      req,
      res,
      "Successfully add user profile.",
      "/assignment"
    );
  } catch (error) {
    console.log(error);
    alert.alertDanger(req, res, `${error.message}`, "/assignment");
  }
};

const updateAssignment = async (req, res) => {
  try {
    // const { uuid, fullName, job, bio, userId } = req.body;
    const { uuid, city, start_date, end_date, description, assignee } =
      req.body;
    console.log(req.body);

    await Assignment.update(
      {
        city,
        start_date,
        end_date,
        description,
        assignor: req.user.uuid,
        assignee,
      },
      {
        where: { uuid },
      }
    );

    alert.alertSuccess(
      req,
      res,
      "Successfully update user profile.",
      "/assignment"
    );
  } catch (error) {
    console.log(error);
    alert.alertDanger(req, res, `${error.message}`, "/assignment");
  }
};

const deleteAssignment = async (req, res) => {
  try {
    console.log(req.params.uuid);
    const uuid = req.params.uuid;
    await Assignment.destroy({
      where: { uuid },
    });

    req.flash("alertMessage", "Successfully delete user.");
    req.flash("alertStatus", "success");
    res.redirect("/assignment");
  } catch (error) {
    console.log(error);
    req.flash("alertMessage", `${error.message}.`);
    req.flash("alertStatus", "danger");
    res.redirect("/assignment");
  }
};

module.exports = {
  getAllAssigments,
  createAssignment,
  updateAssignment,
  deleteAssignment,
};
