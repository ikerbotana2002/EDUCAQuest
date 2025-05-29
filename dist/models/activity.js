"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activity = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
exports.Activity = connection_1.default.define('Activity', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    id_subject: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    type: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    available: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    deadline: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    photo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    num_fields: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    result: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
});
