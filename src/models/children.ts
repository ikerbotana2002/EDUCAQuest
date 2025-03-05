import { DataTypes } from 'sequelize';
import sequelize from '../database/connection';

export const Children = sequelize.define(
    'Children',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_father: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_child: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'children', // Asegúrate de que el nombre de la tabla sea correcto
        timestamps: false
    }
);