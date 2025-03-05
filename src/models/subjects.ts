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
    }
)