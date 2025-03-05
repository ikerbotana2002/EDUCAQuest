import { DataTypes } from "sequelize";
import sequelize from "../database/connection";

export const Activity = sequelize.define(
    'Activity',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        id_subject: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        type: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        available: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        deadline: {
            type: DataTypes.DATE,
            allowNull: false
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        num_fields: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }
)