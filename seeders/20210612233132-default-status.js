"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "statuses",
      [
        {
          uuid: "7a64b5a1-6762-4b10-85e5-671e7476f78c",
          description: "waiting",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid: "55f7af35-349a-45d9-b419-2b26166224cb",
          description: "accept by field engineer manager",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid: "1fbaafde-7395-4a0f-bca5-e6e3e4848c31",
          description: "accept by finance staff",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid: "3aad21d8-5c77-43cf-862f-cc8cd3440dfb",
          description: "accept by finance manager",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid: "61f2cba5-6099-4055-a682-6c09da734881",
          description: "transfered",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("statuses", null, {});
  },
};
