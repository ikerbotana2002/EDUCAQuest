import { DataTypes } from "sequelize";
import sequelize from "../database/connection";

export const User = sequelize.define(
    'User',
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
        lastname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rol_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        avatar: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        degree: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        selectedSubjects: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'users', // Asegúrate de que el nombre de la tabla sea correc
        timestamps: false
    }
)