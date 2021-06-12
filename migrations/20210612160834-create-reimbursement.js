"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("reimbursements", {
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
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("reimbursements");
  },
};
