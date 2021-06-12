"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "employees",
      [
        {
          uuid: "7c60299c-199d-4eb9-a36c-b233a3f9ae5a",
          username: "farhan",
          password: bcrypt.hashSync("PassFarhan", 12),
          name: "Farhan Aziz",
          role: "Manager",
          division: "Field Engineer",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid: "dec07dd6-8cdc-4b35-8269-cfb0c2b49f86",
          username: "rizki",
          password: bcrypt.hashSync("PassRizki", 12),
          name: "Rizki Alifian",
          role: "Staff",
          division: "Field Engineer",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid: "fd874ddf-a370-4625-a9d0-9f4355a68c88",
          username: "ravi",
          password: bcrypt.hashSync("PassRavi", 12),
          name: "Ravi Rizky",
          role: "Manager",
          division: "Finance",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid: "45ad4f6d-7ff1-4287-8908-5ac92d6dfb7f",
          username: "ikhsan",
          password: bcrypt.hashSync("PassIkhsan", 12),
          name: "Ikhsan Putra",
          role: "Staff",
          division: "Finance",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("employees", null, {});
  },
};
