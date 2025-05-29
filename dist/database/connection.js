"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize("educa_quest", "root", "4236", {
    host: "localhost",
    dialect: "mysql"
});
/*
const sequelize = new Sequelize(
  "railway", // DB_NAME
  "root",    // DB_USER
  "YMQKexHOTzYDAkmoUhVMuHjdQWOjVefn", // DB_PASSWORD
  {
    host: "caboose.proxy.rlwy.net", // DB_HOST (público)
    port: 21134,                    // puerto correcto
    dialect: "mysql",
    logging: false,
  }
);*/
exports.default = sequelize;
