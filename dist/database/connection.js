"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
/*
const sequelize = new Sequelize("educa_quest" , "root", "4236", {
    host: "localhost",
    dialect: "mysql"
});*/
const sequelize = new sequelize_1.Sequelize("railway", // nombre de la base de datos
"root", // usuario
"iluMDoDHqsjrlLSLiSSSAOXEvWIylkKD", // contraseña
{
    host: "metro.proxy.rlwy.net",
    port: 15087,
    dialect: "mysql",
    logging: false
});
exports.default = sequelize;
