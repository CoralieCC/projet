import { DataTypes } from "sequelize";
import {sequelize} from '../config/database.js'

export const Comment = sequelize.define("comments", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
    comment : {
        type: DataTypes.TEXT,
        allowNull:false
    },
    checked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})