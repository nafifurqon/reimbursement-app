"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("assignments", {
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
    await queryInterface.dropTable("assignments");
  },
};
