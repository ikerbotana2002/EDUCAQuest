"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Process = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
exports.Process = connection_1.default.define('Process', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_activity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    id_user: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    result: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    feedback: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    additionalComment: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
});
