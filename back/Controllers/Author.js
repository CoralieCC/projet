import { Author } from "../Models/Author.js"
import { authorValidation } from "../validationSchemas/authorSchema.js"
import { Op } from "sequelize"
import { idValidation } from '../validationSchemas/idValidation.js'

// post 
export const createAuthor = async (req, res) => {
    const {body} = req
    const {error} = authorValidation(body)
    if(error) return res.status(401).json(error.details[0].message)

    let response;
    try {
        response = await Author.create({...body})
        res.status(201).json({
            status: 201,
            msg: "Created resource",
            data: response.id
        })
    } catch (err) {
        res.status(500).json(err.parent.message)
    }
}

// get all authors
export const findAllAuthors = async (req, res) => {
    let response;
    try {
        response = await Author.findAll()
        res.status(200).json({status: 200, data: response})
    } catch (err) {
        res.status(500).json(err.parent.message)
    }
}

//search 1 author by name
export const authorsBySearch = async (req, res) => {
    const {search} = req.params
    let response;
    try {
        response = await Author.findAll({where: {
            name : {
                [Op.substring]: search
            }
        }, attributes: ['id']})
        res.status(200).json({status: 200, data: response})
    } catch (err) {
        res.status(500).json(err.parent.message)
    }
}

// get 1 author
export const authorById = async (req, res) => {
    const {authorid} = req.params
    const {error} = idValidation(authorid)
    if(error) return res.status(401).json(error.details[0].message)
    let response;
    try {
        response = await Author.findOne({where : {id : authorid}})
        res.status(200).json({status: 200, data: response})
    } catch (err) {
        res.status(500).json(err.parent.message)
    }
}