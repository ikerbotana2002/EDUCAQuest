"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subjects = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
exports.Subjects = connection_1.default.define('Subjects', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    degree: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
}, {
    tableName: 'subjects', // Asegúrate de que el nombre de la tabla sea correcto
    timestamps: false
});
