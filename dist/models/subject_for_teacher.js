"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subjects_for_teacher = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
exports.Subjects_for_teacher = connection_1.default.define('Subjects_for_teacher', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_teacher: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    id_subject: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
});
