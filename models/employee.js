"use strict";
const { Model } = require("sequelize");

const bcrypt = require("../lib/bcrypt");

module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { Assignment } = models;
      this.hasMany(Assignment, { foreignKey: "assignor", as: "user_assignor" });
      this.hasMany(Assignment, { foreignKey: "assignee", as: "user_assignee" });
    }

    static #encrypt = (password) => bcrypt.encrypt(password, 12);

    checkPassword = (password) => bcrypt.compare(password, this.password);

    static register = async ({ username, password, role }) => {
      const encryptedPassword = this.#encrypt(password);

      return this.create({ username, password: encryptedPassword, role });
    };

    static authenticate = async ({ username, password }) => {
      try {
        const user = await this.findOne({ where: { username } });
        if (!user) return Promise.reject("User not registered");

        const isPasswordValid = user.checkPassword(password);
        if (!isPasswordValid) return Promise.reject("Wrong password");

        return Promise.resolve(user);
      } catch (error) {
        return Promise.reject(error);
      }
    };
  }
  Employee.init(
    {
      uuid: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      division: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Employee",
      tableName: "employees",
    }
  );
  return Employee;
};
