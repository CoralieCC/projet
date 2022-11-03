import dotenv from 'dotenv'

dotenv.config()

export const port = process.env.PORT || 8000
export const hostname = process.env.HOST || 'localhost'
export const dataPort = process.env.PORT_DB
export const dataPassword = process.env.PWD_DB
export const dataUser = process.env.USER_DB
export const database = process.env.DATABASE
export const dataType = process.env.TYPE_DB
export const secret = process.env.SECRET_CRYPTO
export const tokenSecret = process.env.SECRET_TOKEN