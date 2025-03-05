import { DataTypes } from "sequelize";
import sequelize from "../database/connection";

export const Subjects_for_teacher = sequelize.define(
    'Subjects_for_teacher',
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
    }
)