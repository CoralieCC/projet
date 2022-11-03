import Sequelize from 'sequelize'
import {database, dataUser, dataPassword, hostname, dataType} from './config.js'

export const sequelize = new Sequelize(database, dataUser, dataPassword, {
    host: hostname,
    dialect: dataType
})