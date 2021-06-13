const express = require("express");
const router = express.Router();
router.use(express.json());
const dashboard = require("../controllers/dashboardController");
const auth = require("../controllers/authController");
const assignment = require("../controllers/assignmentController");
const expense = require("../controllers/expenseController");
const reimbursement = require("../controllers/reimbursementController");
const { restrict } = require("../middlewares/restrict");

//Auth
router.get("/login", auth.getLoginPage);
router.post("/login", auth.actionLogin);
router.get("/logout", auth.actionLogout);

// Dashboard
router.get("/", restrict, dashboard.getDashboard);

// Assignment
router.get("/assignment", restrict, assignment.getAllAssigments);
router.post("/assignment", assignment.createAssignment);
router.put("/assignment", assignment.updateAssignment);
router.delete("/assignment/:uuid", assignment.deleteAssignment);

// Expense
router.get("/expense", restrict, expense.getAllExpenses);
router.post("/expense", expense.createExpense);
router.put("/expense", expense.updateExpense);
router.delete("/expense/:uuid", expense.deleteExpense);

// Reimbursement
router.get("/reimbursement", restrict, reimbursement.getAllReimbursement);
// router.post("/expense", expense.createExpense);
router.put("/reimbursement", reimbursement.updateReimbursement);
// router.delete("/expense/:uuid", expense.deleteExpense);

module.exports = router;
