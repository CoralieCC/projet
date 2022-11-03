import { DataTypes } from "sequelize";
import {sequelize} from '../config/database.js'

export const Book = sequelize.define("books", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    summary : {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image : {
        type: DataTypes.TEXT
    },
    checked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})