"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectsForTeachers = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
exports.SubjectsForTeachers = connection_1.default.define('Subjects_for_teachers', {
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
}, {
    tableName: 'subjects_for_teachers', // Asegúrate de que el nombre de la tabla sea correcto
    timestamps: false
});
