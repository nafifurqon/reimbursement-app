"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { Assignment } = models;
      this.belongsTo(Assignment, {
        foreignKey: "assignment_id",
        as: "assignment",
      });
    }
  }
  Expense.init(
    {
      uuid: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      receipt: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      assignment_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "assignments",
          key: "uuid",
          onDelete: "cascade",
          onUpdate: "cascade",
        },
      },
    },
    {
      sequelize,
      modelName: "Expense",
      tableName: "expenses",
    }
  );
  return Expense;
};
