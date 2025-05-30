import { DataTypes } from "sequelize";
import sequelize from "../database/connection";

export const SubjectsForTeachers = sequelize.define(
    'Subjects_for_teachers',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_teacher: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_subject: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
    {
        tableName: 'subjects_for_teachers', // Asegúrate de que el nombre de la tabla sea correcto
        timestamps: false
    }
)