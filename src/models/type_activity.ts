import { DataTypes } from 'sequelize';
import sequelize from '../database/connection';

export const Type_activity = sequelize.define(
    'Type_activity',
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
        tableName: 'type_activities', // Asegúrate de que el nombre de la tabla sea correcto
        timestamps: false
    }
);