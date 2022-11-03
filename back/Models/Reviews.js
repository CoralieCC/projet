import { DataTypes } from "sequelize";
import {sequelize} from '../config/database.js'

export const Review = sequelize.define("reviews", {
    id : {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    review: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    published : {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    checked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})