"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Assignment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { Employee, Expense, Reimbursement } = models;
      this.belongsTo(Employee, { foreignKey: "assignor", as: "user_assignor" });
      this.belongsTo(User, { foreignKey: "assignee", as: "user_assignee" });
      this.hasMany(Expense, { foreignKey: "assignment_id", as: "expense" });
      this.hasMany(Reimbursement, {
        foreignKey: "assignment_id",
        as: "reimbursemenet",
      });
    }
  }
  Assignment.init(
    {
      uuid: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      assignor: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "employees",
          key: "uuid",
          onDelete: "cascade",
          onUpdate: "cascade",
        },
      },
      assignee: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "employees",
          key: "uuid",
          onDelete: "cascade",
          onUpdate: "cascade",
        },
      },
    },
    {
      sequelize,
      modelName: "Assignment",
      tableName: "assignments",
    }
  );
  return Assignment;
};
