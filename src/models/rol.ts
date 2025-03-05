import { DataTypes } from 'sequelize';
import sequelize from '../database/connection';

export const Rol = sequelize.define(
    'Rol',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'rol', // Asegúrate de que el nombre de la tabla sea correcto
        timestamps: false
    }
);