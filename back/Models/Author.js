import { DataTypes } from "sequelize";
import {sequelize} from '../config/database.js'

export const Author = sequelize.define("authors", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    }, 
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    }
})