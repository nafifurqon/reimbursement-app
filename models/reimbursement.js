"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reimbursement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { Assignment, Status } = models;
      this.belongsTo(Assignment, {
        foreignKey: "assignment_id",
        as: "assignment",
      });
      this.belongsTo(Status, { foreignKey: "status_id", as: "status" });
    }
  }
  Reimbursement.init(
    {
      uuid: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      total: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      dokumen: {
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
      status_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "statuses",
          key: "uuid",
          onDelete: "cascade",
          onUpdate: "cascade",
        },
      },
    },
    {
      sequelize,
      modelName: "Reimbursement",
      tableName: "reimbursements",
    }
  );
  return Reimbursement;
};
