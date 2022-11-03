import { DataTypes } from "sequelize";
import {sequelize} from '../config/database.js'

export const User = sequelize.define("users", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull:false,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})