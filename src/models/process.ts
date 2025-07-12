import { DataTypes } from "sequelize";
import sequelize from "../database/connection";

export const Process = sequelize.define(
    'Process',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_activity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        result: {
            type: DataTypes.STRING,
            allowNull: false
        },
        feedback: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        additionalComment: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'processes', // Asegúrate de que el nombre de la tabla sea correct
        timestamps: true
    }
)