import { DataTypes } from "sequelize";
import sequelize from "../database/connection";

export const Subjects = sequelize.define(
    'Subjects',
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
        degree: {
            type: DataTypes.INTEGER,
            allowNull: false
        }, 
    },
    {
        tableName: 'subjects', // Asegúrate de que el nombre de la tabla sea correcto
        timestamps: false
    }
)