"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
/*const sequelize = new Sequelize("educa_quest" , "root", "4236", {
    host: "localhost",
    dialect: "mysql"
});*/
const sequelize = new sequelize_1.Sequelize("railway", "root", "YMQKexHOTzYDAkmoUhVMuHjdQWOjVefn", {
    host: "containers-us-west-xx.railway.app",
    port: Number(3306),
    dialect: 'mysql',
    logging: false,
});
exports.default = sequelize;
